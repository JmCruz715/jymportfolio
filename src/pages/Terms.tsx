import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-8">
        <button onClick={() => navigate(-1)} className="smooth-btn mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="smooth-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Terms of Service</h1>
          </div>
          <div className="space-y-4 text-sm leading-6 text-foreground/90">
            <p>By using this site you agree to the following:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>APKs and downloads are provided as-is. Install at your own risk.</li>
              <li>Purchases are digital and non-refundable once the download link is delivered.</li>
              <li>Do not misuse the AI chat, upload malicious content, or attempt to abuse forms.</li>
              <li>The site owner may update products, prices, and content at any time.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Terms;
