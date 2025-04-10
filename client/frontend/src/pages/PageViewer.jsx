import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AVAILABLE_BLOCKS } from "../components/blocks.jsx";

export default function PageViewer() {
  const { slug } = useParams();
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pages/${slug}`)
      .then((res) => res.json())
      .then((page) => {
        setLayout(page.content.layout);
      });
  }, [slug]);

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      {layout.map((block, idx) => {
        const comp = AVAILABLE_BLOCKS.find((b) => b.id === block.id);
        return <div key={block.key}>{comp?.render(block.props)}</div>;
      })}
    </div>
  );
}
