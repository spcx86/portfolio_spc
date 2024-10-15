import Image from "next/image";

export function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-left dark:text-white">Hello, I'm Subha</h1>

      <div className="flex flex-col-reverse md:flex-row items-center mb-12">
        <div className="text-center md:text-left flex-1 mt-6 md:mt-0 md:mr-8">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">I build things on the internet, mostly with code.</p>
          
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
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Current Endeavors</h3>
        <p className="text-lg text-gray-700 mb-4 dark:text-gray-300">
          By day, I'm a software engineer on the lookout for my next challenge in the startup world. In my free time, I'm tinkering with TubeTrotter (www.tubetrotter.live), a side project that marries travel vlogs with interactive maps.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 dark:text-gray-300">
          <li>A passion project built from the ground up</li>
          <li>Where I get to play product manager, UX designer, and full-stack developer all at once</li>
          <li>Powered by JavaScript, React, and Google Maps API</li>
          <li>Visited by over 10,000 curious souls (and counting)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Past Adventures</h3>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 dark:text-gray-300">
          <li>Sharechat: Where I made payments smoother and fraud a bit harder</li>
          <li>Rippling: Where I helped data find its way home</li>
          <li>Razorpay: Where I kept the digital cash flowing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Tools in My Belt</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          I speak fluent Go, Python, Java, React, and Next.js. And yes, I can center a div.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          But here's the thing: I'm a fast learner, and with the rise of AI and generative AI, picking up new tech stacks is easier than ever. Case in point: I built TubeTrotter using Node.js, a technology I had zero experience with before starting the project. So don't worry if your tech stack doesn't match my list perfectly – I'm always ready to adapt and learn.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">What I'm After</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          I'm seeking a role where I can:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 dark:text-gray-300">
          <li>Wear multiple hats (figuratively, of course)</li>
          <li>Tackle challenges that make a real difference</li>
          <li>Learn something new every day</li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Preferably at a startup where the coffee is strong and the problems are interesting.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Let's Connect</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          If you want to chat about code, startups, or why anyone would map YouTube videos for fun, drop me a line at <a href="mailto:subhapradachand@gmail.com" className="text-blue-500 hover:underline dark:text-blue-400">subhapradachand@gmail.com</a>.
        </p>
      </section>

      <hr className="my-8" />

      <p className="text-center text-lg text-gray-700 dark:text-gray-300">
        Thanks for stopping by. May your code be bug-free and your builds always green.
      </p>
    </div>
  );
}
