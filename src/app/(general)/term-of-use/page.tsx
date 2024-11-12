// import libs
import Head from "next/head";

export default function TermsOfUsePage() {
  return (
    <div className=" min-h-screen">
      <Head>
        <title>Terms of Use</title>
        <meta name="description" content="Read our terms of use." />
      </Head>
      <div className="flex-1 flex flex-col pt-[50px] pb-[50px] space-y-6">
        <h1 className="text-4xl font-semibold mb-2 text-center text-[#5271FF]">
          Terms of Use
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
              <li>2. Definitions</li>{" "}
            </a>
            <a href="#3" className="hover:text-[#11009E]">
              {" "}
              <li>3. Eligibillity and Account Responsibilities</li>{" "}
            </a>
            <a href="#4" className="hover:text-[#11009E]">
              {" "}
              <li>4. Intellectual Property Rights</li>{" "}
            </a>
            <a href="#5" className="hover:text-[#11009E]">
              {" "}
              <li>5. Privacy Policy</li>{" "}
            </a>
            <a href="#6" className="hover:text-[#11009E]">
              {" "}
              <li>6. Our Responsibilities and Disclaimer</li>{" "}
            </a>
            <a href="#7" className="hover:text-[#11009E]">
              {" "}
              <li>7. Limitation of Liability</li>{" "}
            </a>
            <a href="#8" className="hover:text-[#11009E]">
              {" "}
              <li>8. Changes to Terms</li>{" "}
            </a>
            <a href="#9" className="hover:text-[#11009E]">
              {" "}
              <li>9. Dispute Resolution</li>{" "}
            </a>
            <a href="#10" className="hover:text-[#11009E]">
              {" "}
              <li>10. Contact Us</li>{" "}
            </a>
          </ul>
        </div>
        <div className="flex-1 text-justify">
          <p>
            Welcome to{" "}
            <span className="text-[#5271FF] font-semibold">4STUDY</span>. These
            <span className="text-[#5271FF] font-semibold">
              Terms of use
            </span>{" "}
            govern your access to and use of the services and content provided
            by our platform. By accessing our website, you agree to comply with
            these Terms. Please read them carefully.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="1" className="text-2xl mb-2 text-[#5271FF]">
            1. Introduction
          </h2>
          <p>
            <span className="text-[#5271FF] font-semibold">4STUDY</span> is an
            online platform that offers course recommendations and related
            educational information to users. These Terms outline your rights
            and responsibilities when accessing and using our platform. By
            registering for an account, browsing our website, or using our
            services in any way, you agree to abide by these Terms and any
            applicable laws or regulations.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="2" className="text-2xl mb-2 text-[#5271FF]">
            2. Definitions
          </h2>
          <ul> </ul>
          <li>
            Services: All services provided by our website, including but not
            limited to course recommendations, course listings, educational
            content, user reviews, and other related resources.
          </li>
          <li>
            User: Any individual who visits, accesses, or uses our website or
            services, whether registered or not.
          </li>
          <li>
            Account: The personal account created by a User on our website to
            access certain features, including personalized recommendations and
            saved courses.
          </li>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="3" className="text-2xl mb-2 text-[#5271FF]">
            3. Eligibility and Account Responsibilities
          </h2>
          <p>
            To use our services, you must be at least 18 years old or have the
            consent of a parent or legal guardian. By creating an account and
            using our services, you represent and confirm that you meet this age
            requirement.
          </p>
          <ul> </ul>
          You agree to:
          <li>
            Provide accurate, complete, and up-to-date information during the
            registration process and promptly update any changes.
          </li>
          <li>
            Keep your login credentials secure and not share them with any third
            parties.
          </li>
          <li>
            Use any branding, trademarks, or logos without prior written
            consent.Notify us immediately of any unauthorized access to your
            account or other security breaches.
          </li>
          <p>
            We reserves the right to suspend or terminate your account if we
            suspect unauthorized access, inaccurate information, or any
            violation of these Terms.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="4" className="text-2xl mb-2 text-[#5271FF]">
            4. Intellectual Property Rights
          </h2>
          <p>
            All content on our website, including but not limited to text,
            graphics, images, videos, logos, software, and code, is the property
            of [Website Name] or third-party content providers. This content is
            protected by copyright, trademark, and other intellectual property
            laws.
          </p>
          <ul> </ul>
          You agree that you will not:
          <li>
            Copy, modify, reproduce, distribute, or publicly display any content
            without express written permission from our website or the
            respective owner.
          </li>
          <li>
            Use any content for commercial purposes or to benefit any
            third-party unless expressly permitted by these Terms.
          </li>
          <li>
            Create derivative works based on the website&apos;s content without
            authorization.
          </li>
          <p>
            Unauthorized use of any content may result in the termination of
            your access to our services and could lead to legal action.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="5" className="text-2xl mb-2 text-[#5271FF]">
            5. Privacy Policy
          </h2>
          <p>
            We take the protection of your personal information seriously and
            are committed to handling your data responsibly and securely. Our
            Privacy Policy, explains our practices regarding the collection,
            use, and protection of your personal information. By using our
            website, you consent to our data practices as outlined in the
            Privacy Policy. We encourage you to review this policy regularly to
            stay informed about our data practices and your rights.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="6" className="text-2xl mb-2 text-[#5271FF]">
            6. Our Responsibilities and Disclaimer
          </h2>
          <p>
            We strive to provide accurate, up-to-date, and relevant information
            to support your educational goals. However, we do not guarantee the
            accuracy, completeness, or timeliness of any content on our
            platform, including course recommendations, descriptions, prices, or
            availability.
          </p>
          <ul> </ul>
          Disclaimer of Liability:
          <li>
            We shall not liable for any inaccuracies, errors, or omissions in
            the information provided on our platform.
          </li>
          <li>
            We are not responsible for any actions or decisions made based on
            the information on our website.
          </li>
          <li>
            You are encouraged to verify information directly with the
            respective course providers before making any educational or
            financial commitments.
          </li>
          <p>
            By using our platform, you acknowledge that the website provides
            information &apos;as-is&apos; and &apos;as-available&apos; without
            warranties of any kind, express or implied.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="7" className="text-2xl mb-2 text-[#5271FF]">
            7. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, the website and its
            affiliates, partners, officers, employees, and agents will not be
            liable for any direct, indirect, incidental, special, consequential,
            or punitive damages arising out of or related to your access to or
            use of our website or services. This includes any losses from the
            inability to use our services or reliance on information provided,
            even if the website has been advised of the possibility of such
            damages.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="8" className="text-2xl mb-2 text-[#5271FF]">
            8. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify or update these Terms at any time, at
            our discretion, without prior notice. Any changes will take effect
            immediately upon publication on our website. It is your
            responsibility to review these Terms periodically. Continued use of
            our services following the posting of changes constitutes acceptance
            of the updated Terms.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="9" className="text-2xl mb-2 text-[#5271FF]">
            9. Dispute Resolution
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of Vietnam. In the event of any dispute, disagreement, or claim
            related to your use of our services, we encourage resolution through
            amicable negotiation. However, if negotiation fails, disputes will
            be subject to the exclusive jurisdiction of the competent courts in
            Vietnam.
          </p>
        </div>
        <div className="flex-1 text-justify">
          <h2 id="10" className="text-2xl mb-2 text-[#5271FF]">
            10. Contact Us
          </h2>
          <p>
            If you have any questions, concerns, or feedback regarding these
            Terms, please contact our support team at our platform please feel
            free to reach out to us. Our support team is available to address
            any inquiries you may have.
          </p>
        </div>
      </div>
    </div>
  );
}
