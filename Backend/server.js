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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
