import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AVAILABLE_BLOCKS } from "../components/Blocks";

export default function PageViewer() {
  const { slug } = useParams();
  const [layout, setLayout] = useState([]);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pages/${slug}`)
      .then((res) => res.json())
      .then((page) => setLayout(page.content.layout));
  }, [slug]);

  const handleChange = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/pages/${slug}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: formData }),
        }
      );
      await res.json();
      alert("Submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      {layout.map((block) => {
        const comp = AVAILABLE_BLOCKS.find((b) => b.id === block.id);
        return (
          <div key={block.key}>
            {comp?.render(block.props, {
              formData,
              submitting,
              handleChange,
              handleSubmit,
            })}
          </div>
        );
      })}
    </div>
  );
}
