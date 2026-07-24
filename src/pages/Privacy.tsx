import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-8">
        <button onClick={() => navigate(-1)} className="smooth-btn mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="smooth-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            This page is maintained by JM Cruz to answer common privacy questions about this site.
          </p>
          <div className="space-y-4 text-sm leading-6 text-foreground/90">
            <section>
              <h2 className="font-semibold mb-1">Data we collect</h2>
              <p>We only store data you actively provide (e.g. name, email, and payment receipt when placing an order).</p>
            </section>
            <section>
              <h2 className="font-semibold mb-1">How we use it</h2>
              <p>Order details are used solely to verify payment and deliver the requested app to the email you supplied.</p>
            </section>
            <section>
              <h2 className="font-semibold mb-1">Storage & security</h2>
              <p>Orders and uploaded receipts are stored securely on our backend with access limited to the site owner.</p>
            </section>
            <section>
              <h2 className="font-semibold mb-1">Contact</h2>
              <p>Questions? Message the owner via Messenger from the profile page.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Privacy;
