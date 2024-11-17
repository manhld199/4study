// import libs
import Head from "next/head";

export default function TermsOfUsePage() {
  return (
    <div className=" min-h-screen">
      <Head>
        <title>Terms of Service</title>
        <meta name="description" content="Read our terms of service." />
      </Head>
      <div className="flex-1 flex flex-col pt-[50px] pb-[50px] space-y-6">
        <h1 className="text-4xl font-semibold mb-2 text-center text-[#5271FF]">
          Terms of Service
        </h1>
        <div className="w-full border border-[#5271FF] border-l-4 p-5 mx-auto">
          <h2 className="text-2xl text-[#5271FF] font-semibold mb-2">
            Table of Contents
          </h2>
          <ul className="flex flex-col gap-3 text-gray">
            <a href="#1" className="hover:text-[#11009E]">
              <li>1. Introduction</li>
            </a>
            <a href="#2" className="hover:text-[#11009E]">
              <li>2. Use of Services</li>{" "}
            </a>
            <a href="#3" className="hover:text-[#11009E]">
              {" "}
              <li>3. Intellectual Property Rights</li>{" "}
            </a>
            <a href="#4" className="hover:text-[#11009E]">
              {" "}
              <li>4. Privacy Policy</li>{" "}
            </a>
            <a href="#5" className="hover:text-[#11009E]">
              {" "}
              <li>5. Our Responsibilities</li>{" "}
            </a>
            <a href="#6" className="hover:text-[#11009E]">
              {" "}
              <li>6. Changes to Terms</li>{" "}
            </a>
            <a href="#7" className="hover:text-[#11009E]">
              {" "}
              <li>7. Contact Us</li>{" "}
            </a>
          </ul>
        </div>
        <div className="flex-1 text-justify">
          <p>
            Welcome to{" "}
            <span className="text-[#5271FF] font-semibold">4STUDY</span>. These{" "}
            <span className="text-[#5271FF] font-semibold">
              Term of Service
            </span>{" "}
            outline the terms and conditions for accessing and using our
            services, including course recommendations. By using our website,
            you agree to these Terms and our Privacy Policy. Please read them
            carefully.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="1" className="text-2xl mb-2 text-[#5271FF]">
            1. Introduction
          </h2>
          <p>
            Thank you for choosing{" "}
            <span className="text-[#5271FF] font-semibold">4STUDY</span>. Our
            platform is dedicated to helping users find relevant and valuable
            educational courses across various subjects. These Terms govern your
            use of our website, including browsing, registration, and
            interaction with course recommendations. By creating an account and
            using our services, you agree to comply with these Terms and all
            applicable laws and regulations.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="2" className="text-2xl mb-2 text-[#5271FF]">
            2. Use of Services
          </h2>
          <p>
            To access certain features, you may be required to create an
            account. When registering, you agree to provide accurate, complete,
            and current information, and to keep your account information
            up-to-date. You are responsible for maintaining the confidentiality
            of your login credentials and for all activity conducted through
            your account.
          </p>
          <ul>
            By using our platform, you agree to do so solely for lawful
            purposes. You must not:{" "}
          </ul>
          <li>
            Provide false, misleading, or outdated information during
            registration or at any other time.
          </li>
          <li>
            Use the services to engage in illegal activities or in ways that
            could harm or infringe on the rights of others.
          </li>
          <li>
            Interfere with or disrupt the security or functionality of the
            platform, including unauthorized access to accounts or systems.
          </li>
          <li>
            Attempt to gain unauthorized access to any other user’s account or
            information, or reverse engineer our platform.
          </li>
          <p>
            Failure to comply with these conditions may result in suspension or
            termination of your account and access to our services.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="3" className="text-2xl mb-2 text-[#5271FF]">
            3. Intellectual Property Rights
          </h2>
          <p>
            All content on our platform, including but not limited to text,
            graphics, images, logos, videos, and software, is owned by or
            licensed to the website or third-party content providers and is
            protected by copyright, trademark, and other intellectual property
            laws.
          </p>
          <ul>
            You are granted a limited, non-exclusive, non-transferable license
            to access and use the content solely for personal, non-commercial
            purposes. You may not:
          </ul>
          <li>
            Copy, modify, distribute, or display any part of the content without
            express permission.
          </li>
          <li>Create derivative works based on the content.</li>
          <li>
            Use any branding, trademarks, or logos without prior written
            consent.
          </li>
          <li>
            Attempt to gain unauthorized access to any other user&apos;s account
            or information, or reverse engineer our platform.
          </li>
          <p>
            {" "}
            Any unauthorized use of our intellectual property may result in
            termination of your access to the platform and could lead to legal
            action.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="4" className="text-2xl mb-2 text-[#5271FF]">
            4. Privacy Policy
          </h2>
          <p>
            Protecting your personal information is a top priority for us. Our
            Privacy Policy outlines how we collect, use, and protect the data
            you share with us. By using our platform, you consent to our data
            practices as described in our Privacy Policy. This includes
            information collected when you create an account, browse the
            platform, interact with course recommendations, or communicate with
            us. We encourage you to review the Privacy Policy regularly to
            understand your rights and how we handle your information.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="5" className="text-2xl mb-2 text-[#5271FF]">
            5. Our Responsibilities
          </h2>
          <p>
            We strive to offer high-quality, accurate, and timely course
            recommendations to help users make informed educational choices.
            While we make every effort to ensure that our course information is
            current and reliable, we do not guarantee the accuracy,
            completeness, or timeliness of all content. Course details, such as
            pricing, content, and availability, are subject to change by the
            course providers, and we are not responsible for any such
            discrepancies.
          </p>
          <p>
            {" "}
            Our services are provided on an informational basis only, and users
            are encouraged to independently verify information with the
            respective course providers when necessary. We disclaim any
            liability for decisions made based on the content provided on our
            platform.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="6" className="text-2xl mb-2 text-[#5271FF]">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify, update, or revise these Terms of
            Service at any time. When significant changes are made, we will
            update the “Effective Date” at the top of these Terms and, when
            appropriate, notify users by email or through a notice on our
            platform. By continuing to use our services after any changes to
            these Terms, you agree to the updated Terms. We encourage users to
            review these Terms periodically to stay informed of any
            modifications.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="7" className="text-2xl mb-2 text-[#5271FF]">
            7. Contact Us
          </h2>
          <p>
            If you have any questions, feedback, or concerns regarding these
            Terms of Service or our platform, please feel free to reach out to
            us. Our support team is available to address any inquiries you may
            have.
          </p>
        </div>
      </div>
    </div>
  );
}
