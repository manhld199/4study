// import libs
import Head from 'next/head';

export default function TermOfServicePage() {
  return (
    <div className="bg-[#FFE3FA] min-h-screen">
      <Head>
        <title>Terms of Service</title>
        <meta name="description" content="Read our terms of use." />
      </Head>
      <div className="flex-1 flex flex-col">
        <div className="bg-[#FFE3FA] text-black p-8 mx-[280px] flex-1">
          <h1 className="text-6xl font-semibold mb-2 text-center text-[#11009E]">📜｡ Terms of Service ࣪ ˖📖</h1>
        </div>
        <p className="text-4xl text-center my-4">✧˖°.📚☁️.°˖✧</p>
        <div className="bg-[#FFE3FA] text-black p-8 mx-[240px] flex-1">
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>1. Introduction</u></h2>
          <p>
            Welcome to [Website Name]. These terms govern the use of the services we provide, including recommending courses to users.
          </p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>2. Use of Services</u></h2>
          <p>
            Users must provide accurate and complete information when registering for an account.
          </p>
          <p>
            You agree to use the services for lawful purposes and not to violate any legal regulations.
          </p>         
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>3. Intellectual Property Rights</u></h2>
          <p>All content on the website, including text, images, and logos, is the property of [Website Name] or third parties. You may not copy, distribute, or use it without permission.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>4. Privacy Policy</u></h2>
          <p>We are committed to protecting your personal information according to our privacy policy</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>5. Our Responsibilities</u></h2>
          <p>We strive to provide accurate and up-to-date information about the courses. However, we do not guarantee the accuracy, completeness, or timeliness of the information.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>6. Changes to Terms</u></h2>
          <p>We reserve the right to change these terms at any time. Users will be notified of significant changes.</p>
          <h2 className="text-2xl font-semibold mb-2 text-[#11009E]"><u>7. Contact Us</u></h2>
          <p>If you have any questions about these terms, please contact us.</p>
        </div>
      </div>
    </div>
  );
}
