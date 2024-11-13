// import libs
import Head from 'next/head';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Terms of Use</title>
        <meta name="description" content="Read our terms of use." />
      </Head>
      <div className="flex-1 flex flex-col">
        <div className="text-black p-8 flex-1">
          <h1 className="text-6xl font-semibold mb-2 text-center text-[#11009E]">Terms of Use</h1>
        </div>
        <div className="text-black p-8 flex-1">
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>1. Introduction</u></h2>
          <p>
            Welcome to [Website Name]. These terms govern the use of our services and content. By accessing and using our services, you agree to comply with these terms.
          </p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>2. Definitions</u></h2>
          <p>
            Services: All services provided by [Website Name], including course recommendations and related information.
          </p>
          <p>
            User: Any individual who accesses the website and uses the services.
          </p>          
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>3. Intellectual Property</u></h2>
          <p>You must be at least 18 years old or have the consent of a parent or guardian to use the services.</p>
          <p>You agree to provide accurate and up-to-date information during the registration and use of the services.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>4. Limitation of Liability</u></h2>
          <p>You have the right to access and use the services according to these terms.</p>
          <p>You are responsible for keeping your account information secure and not disclosing it to third parties.</p>
          <p>You may not use the services for illegal purposes or to harm others.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>5. Intellectual Property Rights</u></h2>
          <p>All content on the website, including text, images, videos, and logos, is the property of [Website Name] or third parties. You may not copy, distribute, or use it without permission.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>6. Privacy Policy</u></h2>
          <p>We are committed to protecting your personal information according to the privacy policy outlined at [Link to Privacy Policy]. Personal information will only be used for the purpose of providing services.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>7. Our Responsibilities</u></h2>
          <p>We do not guarantee the accuracy, completeness, or timeliness of the information on the website. You should verify the information before making any decisions.</p>
          <p>We are not liable for any damages arising from the use or non-use of the information on the website.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>8. Changes to Terms</u></h2>
          <p>We reserve the right to change these terms without prior notice. Changes will take effect immediately upon publication on the website. You should regularly check the terms for updates.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>9. Dispute Resolution</u></h2>
          <p>Any disputes arising from the use of the services will be resolved according to the laws of Vietnam. If not resolved through negotiation, the dispute will be brought before the competent court.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>10. Contact Us</u></h2>
          <p>If you have any questions about these terms, please contact us.</p>
        </div>
      </div>
    </div>
  );
}
