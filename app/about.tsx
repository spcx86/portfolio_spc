import Image from "next/image";

export function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-left dark:text-white">Hello, I&apos;m Subha</h1>

      <div className="flex flex-col-reverse md:flex-row items-center mb-12">
        <div className="text-center md:text-left flex-1 mt-6 md:mt-0 md:mr-8">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">I build things on the internet, mostly with code.</p>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Software Engineer with 5+ years of experience, seeking a founding engineer role in an early-stage startup.
          </p>
        </div>
        <div className="mb-6 md:mb-0">
          <div className="rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-700 w-48 h-48 mx-auto md:mx-0">
            <a href="https://x.com/shooooobh" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/spc_pic.png"
                alt="Subhaprada Chand"
                className="grayscale hover:grayscale-0 transition-all duration-300"
                width={192}
                height={192}
                priority
              />
            </a>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">What I&apos;m Looking For</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          I&apos;m on the hunt for a position where I can:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 dark:text-gray-300">
          <li>Be a key player in an early-stage startup</li>
          <li>Wear multiple hats and contribute across the stack</li>
          <li>Tackle challenging problems that directly impact business growth</li>
          <li>Continue learning and growing in a fast-paced environment</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Professional Experience</h3>
        <p className="text-lg text-gray-700 mb-4 dark:text-gray-300">
          With 5+ years in the industry, I&apos;ve honed my skills at:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 dark:text-gray-300">
          <li><strong>Sharechat</strong> (2023-): Optimized payment systems and implemented fraud prevention, directly impacting revenue.</li>
          <li><strong>Rippling</strong> (2021-2023): Led development of data import tools, improving client onboarding efficiency.</li>
          <li><strong>Razorpay</strong> (2019-2021): Built and maintained critical payment testing infrastructure.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Tools in My Belt</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Proficient in Go, Python, Java, React, and Next.js. But here&apos;s the kicker: I&apos;m a fast learner. With today&apos;s AI tools, I can quickly adapt to any tech stack. Case in point: I built my side project, TubeTrotter, using Node.js—a technology I learned from scratch for the project.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Current Side Project</h3>
        <p className="text-lg text-gray-700 mb-4 dark:text-gray-300">
          <span>
          <strong>TubeTrotter </strong>
            <a href="https://www.tubetrotter.live" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">
             (www.tubetrotter.live)
            </a> 
          </span>
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 dark:text-gray-300">
          <li>An interactive map showcasing YouTube travel vlogs</li>
          <li>Built from the ground up in my spare time</li>
          <li>Juggling roles: product manager, UX designer, and full-stack developer</li>
          <li>Tech stack: JavaScript, React, Google Maps API</li>
          <li>Attracted over 10,000 visitors since launch</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Let&apos;s Connect</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          If you&apos;re building something exciting and need a versatile engineer who can hit the ground running, let&apos;s chat. Reach me at <a href="mailto:subhapradachand@gmail.com" className="text-blue-500 hover:underline dark:text-blue-400">subhapradachand@gmail.com</a>.
        </p>
      </section>

      <hr className="my-8" />

      <p className="text-center text-lg text-gray-700 dark:text-gray-300">
        Thanks for stopping by. Here&apos;s to building the next big thing!
      </p>
    </div>
  );
}
