// import libs
import Head from "next/head";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen ">
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about us." />
      </Head>
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <Image
            src="/imgs/about-1.png"
            alt="about-1"
            width={1440}
            height={500}
          />
        </div>
        <div className="bg-white flex flex-row px-[130px] pt-[50px] pb-[50px] justify-center gap-10 items-center">
          <div>
            <Image
              src="/imgs/about-2.png"
              alt="about-2"
              width={490}
              height={386}
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="border border-[#D4D1D1] w-[600px] h-auto px-10 py-5 rounded-[18px]">
              <h1 className="text-2xl font-semibold mb-2 text-[#5271FF]">
                Who Are We?
              </h1>
              <p className="text-justify">
                <span className="text-[#5271FF] font-semibold">4STUDY</span> was
                established with the mission of providing learners with the most
                accurate and useful information about online courses. Our team
                consists of technology students, all passionate about helping
                you find the most suitable learning opportunities.
              </p>
            </div>
            <div className="border border-[#D4D1D1] w-[600px] h-auto px-10 py-5 rounded-[18px]">
              <h1 className="text-2xl font-semibold mb-2 text-[#5271FF]">
                Our Mission
              </h1>
              <p className="text-justify">
                We believe that education is the key to unlocking the door to
                the future. That&apos;s why we are committed to bringing you
                quality course recommendations to help you enhance your skills
                and advance your career. Whether you are a student, a working
                professional, or seeking a change, we are here to support you on
                your learning journey.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black px-[130px] pt-[50px] pb-[50px] flex-1 flex-col">
          <h1 className="text-3xl font-semibold pb-8 text-center text-[#5271FF]">
            Why choose us?
          </h1>
          <div className="flex flex-row gap-5">
            <div className=" bg-[#9BACFF] border border-[#D4D1D1] w-[380px] h-auto px-5 py-5 rounded-[18px]">
              <h1 className="text-2xl font-semibold pb-2 text-white text-center">
                Reliability
              </h1>
              <p className="text-center text-white">
                We thoroughly survey and evaluate each course to ensure the
                information you receive is accurate and up-to-date.
              </p>
            </div>
            <div className="bg-[#5271FF] border border-[#D4D1D1] w-[380px] h-auto px-5 py-5 rounded-[18px]">
              <h1 className="text-2xl font-semibold pb-2 text-white text-center">
                Diversity
              </h1>
              <p className="text-center text-white">
                From online courses to intensive training programs, we offer a
                wide range of options to meet your needs and goals.g a change,
                we are here to support you on your learning journey.
              </p>
            </div>
            <div className="bg-[#11009E] border border-[#D4D1D1] w-[380px] h-auto px-5 py-5 rounded-[18px]">
              <h1 className="text-2xl font-semibold pb-2 text-white text-center">
                Diversity
              </h1>
              <p className="text-center text-white">
                From online courses to intensive training programs, we offer a
                wide range of options to meet your needs and goals.g a change,
                we are here to support you on your learning journey.
              </p>
            </div>
          </div>
        </div>
        <div className="px-[130px] py-[50px] flex-1">
          <h1 className="pb-8 text-3xl font-semibold text-center text-[#5271FF]">
            Contact Us
          </h1>
          <p className="text-center">
            We look forward to hearing from you! If you have any questions or
            would like more information, please don&apos;t hesitate to reach out
            to us.
          </p>
          <p className="text-center">
            Thank you for visiting{" "}
            <span className="text-[#5271FF] font-semibold">4STUDY</span>.
            Let&apos;s explore wonderful learning opportunities together!
          </p>
        </div>
        {/* <div className="flex flex-col items-center">
          <Image
            src="/imgs/about-3.png"
            alt="about-1"
            width={1440}
            height={500}
          />
        </div> */}
      </div>
    </div>
  );
}
