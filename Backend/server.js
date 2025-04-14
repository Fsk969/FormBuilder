require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/forms", async (req, res) => {
  const { name, slug, schema } = req.body;
  console.log("Received:", name, slug, "\n", "schema", schema);

  try {
    const form = await prisma.form.create({
      data: { name, slug, schema },
    });
    res.json(form);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to save form");
  }
});

app.get("/api/forms", async (req, res) => {
  const forms = await prisma.form.findMany({
    select: { name: true, slug: true },
  });
  res.json(forms);
});

// Add in server.js or your router file:
app.get("/api/forms/:slug/entries", async (req, res) => {
  const { slug } = req.params;

  try {
    const form = await prisma.form.findUnique({
      where: { slug },
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const entries = await prisma.formEntry.findMany({
      where: { formId: form.id },
      orderBy: { createdAt: "desc" },
    });

    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/forms/:slug/entries/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const updated = await prisma.formEntry.update({
      where: { id: Number(id) },
      data: { data },
    });
    res.json(updated);
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ error: "Failed to update entry" });
  }
});

app.get("/api/forms/:slug", async (req, res) => {
  const form = await prisma.form.findUnique({
    where: { slug: req.params.slug },
  });
  if (!form) return res.status(404).send("Form not found");
  res.json(form);
});

app.post("/api/forms/:slug/submit", async (req, res) => {
  const form = await prisma.form.findUnique({
    where: { slug: req.params.slug },
  });
  if (!form) return res.status(404).send("Form not found");
  const entry = await prisma.formEntry.create({
    data: {
      formId: form.id,
      data: req.body,
    },
  });
  res.json(entry);
});

// Create a page
app.post("/api/pages", async (req, res) => {
  const { name, slug, content } = req.body;
  try {
    const page = await prisma.page.create({
      data: { name, slug, content },
    });
    res.json(page);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create page" });
  }
});

// Get all pages
app.get("/api/pages", async (req, res) => {
  try {
    const pages = await prisma.page.findMany({
      select: { name: true, slug: true },
    });
    res.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific page
app.get("/api/pages/:slug", async (req, res) => {
  const page = await prisma.page.findUnique({
    where: { slug: req.params.slug },
  });
  if (!page) return res.status(404).json({ error: "Page not found" });
  res.json(page);
});

app.post("/api/pages/:slug/submit", async (req, res) => {
  const { slug } = req.params;
  const { data } = req.body;

  try {
    // 1. Find the page
    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    const layout = page.content?.layout;
    if (!Array.isArray(layout)) {
      return res.status(400).json({ error: "Invalid page layout" });
    }

    // 2. Find the latest form block from layout
    const formBlock = layout.find((block) => block.id === "form");
    if (!formBlock) {
      return res.status(400).json({ error: "No form block found" });
    }

    const formSlug = `${slug}-form`;

    // 3. Upsert the form (create or update if schema changed)
    const existingForm = await prisma.form.findUnique({
      where: { slug: formSlug },
    });

    let form;

    if (existingForm) {
      // Check if schema has changed
      const schemaChanged =
        JSON.stringify(existingForm.schema) !== JSON.stringify(formBlock.props);

      if (schemaChanged) {
        form = await prisma.form.update({
          where: { slug: formSlug },
          data: { schema: formBlock.props },
        });
      } else {
        form = existingForm;
      }
    } else {
      // Create new form
      form = await prisma.form.create({
        data: {
          name: `${slug} Form`,
          slug: formSlug,
          schema: formBlock.props,
        },
      });
    }

    // 4. Create a page form entry
    const entry = await prisma.pageFormEntry.create({
      data: {
        pageId: page.id,
        formId: form.id,
        data,
      },
    });

    res.status(201).json({ message: "Form submitted", entry });
  } catch (error) {
    console.error("Error in page form submit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a page
app.put("/api/pages/:slug", async (req, res) => {
  const { slug } = req.params;
  const { name, content } = req.body;

  try {
    const updated = await prisma.page.update({
      where: { slug },
      data: { name, content },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update page" });
  }
});

// Delete a page
app.delete("/api/pages/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    await prisma.page.delete({ where: { slug } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete page" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));