// import libs
import Head from 'next/head';

export default function AboutUsPage() {
  return (
    <div className="bg-[#FFE3FA] min-h-screen ">
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <div className="flex-1 flex flex-col">
        <div className="bg-[#FFE3FA] text-black p-8 mx-[240px] flex-1">
          <h1 className="text-3xl font-semibold mb-2 text-center text-[#11009E]">🫧｡ Who Are We? ࣪ ˖🪼</h1>
          <p>
            <strong>Website</strong> was established with the mission of providing learners with the most accurate and useful information about online courses. Our team consists of technology students, all passionate about helping you find the most suitable learning opportunities.
          </p>
        </div>
        <p className="text-4xl text-center my-4">✧˖°.🐋☁️.°˖✧</p>
        <div className="bg-[#FFE3FA] text-black p-8 mx-[240px] flex-1">
          <h1 className="text-3xl font-semibold mb-2 text-center text-[#11009E]">Our Mission</h1>
          <p>
            We believe that education is the key to unlocking the door to the future. That’s why we are committed to bringing you quality course recommendations to help you enhance your skills and advance your career. Whether you are a student, a working professional, or seeking a change, we are here to support you on your learning journey.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2 p-4 text-[#11009E]">Why Choose Us? 🐋</h2>
          <ul className="list-disc list-inside mb-4">
            <li><strong className="text-[#5271FF]">Reliability:</strong> We thoroughly survey and evaluate each course to ensure the information you receive is accurate and up-to-date.</li>
            <li><strong className="text-[#5271FF]">Diversity:</strong> From online courses to intensive training programs, we offer a wide range of options to meet your needs and goals.</li>
            <li><strong className="text-[#5271FF]">Dedicated Support:</strong> Our customer support team is always ready to assist you in selecting courses and answering any questions you may have.</li>
          </ul>
        </div>
        <p className="text-3xl text-center my-4">🎧💌🍓🧺🫧</p>
        <div className="bg-[#FFE3FA] text-black p-4 mx-[240px] flex-1">
          <h1 className="text-3xl font-semibold mb-2 text-center text-[#11009E]">Contact Us</h1>
          <p>
            We look forward to hearing from you! If you have any questions or would like more information, please don’t hesitate to reach out to us.
          </p>
          <p>Thank you for visiting <strong>Website</strong>. Let’s explore wonderful learning opportunities together!</p>
        </div>

        </div>
      </div>
  );
}
