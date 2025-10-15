import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">1. Agreement to Terms</h2>
            <p>
              By accessing and using Home of Recovery's services, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">2. Use of Services</h2>
            <p>
              Our recovery and wellness services are intended for personal use only. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information when booking</li>
              <li>Arrive on time for your scheduled appointments</li>
              <li>Follow all facility rules and staff instructions</li>
              <li>Respect other members and maintain a safe environment</li>
              <li>Notify us of any health conditions that may affect your use of our services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">3. Bookings and Cancellations</h2>
            <p>
              All bookings are subject to availability. Cancellation policies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations must be made at least 24 hours in advance</li>
              <li>Late cancellations (less than 24 hours) may result in forfeiture of the session</li>
              <li>No-shows will result in loss of the booked session</li>
              <li>We reserve the right to cancel or reschedule sessions due to unforeseen circumstances</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">4. Memberships and Session Packs</h2>
            <p>
              Membership and session pack terms:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Memberships are non-transferable and for individual use only</li>
              <li>Session packs expire according to their stated validity period</li>
              <li>Unused sessions or membership periods are non-refundable</li>
              <li>We reserve the right to modify membership terms with reasonable notice</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">5. Health and Safety</h2>
            <p>
              By using our services, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are in good health and have no medical conditions that would prevent safe use of our services</li>
              <li>You will consult with a healthcare provider before using our services if you have any health concerns</li>
              <li>You use our facilities and services at your own risk</li>
              <li>We are not liable for any injuries or health issues arising from use of our services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">6. Payment Terms</h2>
            <p>
              Payment policies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payments must be made in advance of service delivery</li>
              <li>We accept various payment methods as displayed at checkout</li>
              <li>Prices are subject to change with reasonable notice</li>
              <li>Refunds are provided only in accordance with our refund policy</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">7. Intellectual Property</h2>
            <p>
              All content on our website and in our facility, including text, graphics, logos, and images, 
              is the property of Home of Recovery and protected by intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">8. Limitation of Liability</h2>
            <p>
              Home of Recovery shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting to our website. Your continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">10. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-primary">
              <a href="mailto:info@homeofrecovery.au">info@homeofrecovery.au</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
