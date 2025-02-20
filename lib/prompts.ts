export const BASE_PROMPT = `You are an expert web developer specializing in Tailwind CSS.

Your response should:
- Use only Tailwind CSS classes for styling (no custom CSS style attributed)
- Add significant padding and margin to ensure elements don't overlap nor touch the edges of the screen
- Include responsive design classes to support mobile, tablet, and desktop views
- Add Tailwind classes for both light and dark mode
- Preserve existing Tailwind classes when present

Before you start generating the landing page, pick a color scheme (including a primary color), font, and other design elements for the page.
It is extremely important that you do not use light text on light backgrounds or dark text on dark backgrounds.
`;

export function generateLandingPagePrompt(purpose: string, productContext?: string) {
  return `${BASE_PROMPT}

    Generate a compelling landing page for the following purpose:
    "${purpose}"

    ${
      productContext
        ? `Use this existing product data to inform the landing page content:
    ${productContext}`
        : ""
    }

    Additionally, create a complete landing page that:
    - Is self-contained (excluding doctype, html, head, or body tags)
    - Follows landing page best practices
    - Maintains professional design standards while being creative
    - Incorporates the product information naturally into the page content
    - Appends ?wanted=true to the short_url parameter if present and uses it as the href for the CTA
    - Uses images from the product's information
    - Uses the product's name as the title of the page
    - Uses the product's description on the page
    - Uses the short_url with the ?variant query parameter set to the version's name for the version's CTA if present along with ?wanted=true
    - When there are multiple recurrences, use the ?recurrence query parameter (monthly, quarterly, yearly) to set the recurrence for a given CTA
    - The page should be optimized for SEO.

    Here are three examples of landing page HTML to copy the structure from, but make sure to customize the content to the product and be creative:

    Example 1:
    <div class="min-h-screen bg-black text-white">
      <main class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <h1 class="text-6xl font-bold tracking-tight space-y-2">
              <span class="block">Master Web</span>
              <span class="block">
                Scraping <span class="text-indigo-500">with</span>
              </span>
              <span class="block text-indigo-500">JavaScript</span>
            </h1>

            <p class="text-gray-400 text-xl leading-relaxed">
              Learn the secrets of web scraping, automate data collection, and build profitable businesses with your
              coding skills!
            </p>

            <button class="bg-indigo-600 hover:bg-indigo-700 text-lg h-12 px-6 text-white">
              Get Started for $49
              <span class="ml-2">→</span>
            </button>
          </div>

          <div class="relative w-full aspect-[1.61/1]">
            <img
              src="/placeholder.svg?height=500&width=309"
              alt="Course preview"
              class="object-cover rounded-lg shadow-2xl w-full h-full"
            />
          </div>
        </div>

        <section class="py-24 space-y-12">
          <h2 class="text-3xl font-bold text-center">What You'll Learn</h2>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gray-900/50 border-gray-800 p-6 rounded-lg">
              <div class="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                <span class="w-6 h-6 text-indigo-500">⌨️</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Professional Development</h3>
              <p class="text-gray-400">Learn how to build production-ready scrapers and monetize your skills as a professional developer.</p>
            </div>

            <div class="bg-gray-900/50 border-gray-800 p-6 rounded-lg">
              <div class="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                <span class="w-6 h-6 text-indigo-500">⚙️</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Advanced Techniques</h3>
              <p class="text-gray-400">Master advanced scraping techniques including APIs, headless browsers, and proxy management.</p>
            </div>

            <div class="bg-gray-900/50 border-gray-800 p-6 rounded-lg">
              <div class="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                <span class="w-6 h-6 text-indigo-500">🌐</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">Real-World Projects</h3>
              <p class="text-gray-400">Build practical projects scraping e-commerce sites, social media, and real estate data.</p>
            </div>
          </div>
        </section>

        <section class="py-12">
          <div class="flex flex-col md:flex-row gap-12 items-center max-w-3xl mx-auto">
            <div class="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-500 flex-shrink-0">
              <img
                src="/placeholder.svg?height=192&width=192"
                alt="Author"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-bold mb-4">About the Author</h2>
              <p class="text-gray-400 mb-4">
                Professional web developer with over a decade of experience in web scraping and automation. I've helped
                hundreds of developers build successful data-driven businesses.
              </p>
              <div class="flex gap-4 justify-center md:justify-start">
                <button class="text-gray-400 hover:text-white px-3 py-2">
                  <span class="w-4 h-4 mr-2">🐦</span>
                  Twitter
                </button>
                <button class="text-gray-400 hover:text-white px-3 py-2">
                  <span class="w-4 h-4 mr-2">📺</span>
                  YouTube
                </button>
                <button class="text-gray-400 hover:text-white px-3 py-2">
                  <span class="w-4 h-4 mr-2">🌐</span>
                  Website
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="py-24">
          <h2 class="text-3xl font-bold text-center mb-12">Choose Your Package</h2>

          <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div class="bg-gray-900/50 border-gray-800 p-8 rounded-lg">
              <h3 class="text-2xl font-bold mb-4">Course Only</h3>
              <p class="text-gray-400 mb-8">Get lifetime access to the complete web scraping course.</p>
              <div class="text-4xl font-bold mb-8">$49</div>
              <button class="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded">Get Started</button>
            </div>

            <div class="bg-gray-900/50 border-gray-800 p-8 relative overflow-hidden rounded-lg">
              <div class="absolute top-4 right-4 bg-indigo-500 text-white text-sm px-3 py-1 rounded-full">
                Popular
              </div>
              <h3 class="text-2xl font-bold mb-4">Course + Mentoring</h3>
              <p class="text-gray-400 mb-8">Everything in Course Only plus a 1-on-1 mentoring session.</p>
              <div class="text-4xl font-bold mb-8">$149</div>
              <button class="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded">Get Premium Package</button>
            </div>
          </div>
        </section>

        <section class="text-center py-12 border-t border-gray-800">
          <h2 class="text-2xl font-bold mb-4">100% Money-Back Guarantee</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            If you're not completely satisfied with the course within 14 days of purchase, I'll refund your money. No
            questions asked.
          </p>
        </section>
      </main>
    </div>

    Example 2:
    <main class="min-h-screen bg-white text-black p-4 md:p-8 lg:p-16 font-mono">
      <div class="max-w-5xl mx-auto space-y-16">
        <section class="space-y-8">
          <h1 class="text-6xl md:text-8xl font-bold leading-none">
            TRANSFORM
            <br />
            YOUR WORK
          </h1>
          <p class="text-xl md:text-2xl max-w-2xl">
            The no-nonsense productivity tool for professionals who mean business.
          </p>
        </section>

        <div class="relative h-64 md:h-96 w-full">
          <img
            src="/placeholder.svg?height=400&width=800"
            alt="Product Screenshot"
            class="object-cover w-full h-full border-4 border-black"
          />
        </div>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
          <div class="border-t-4 border-black pt-4">
            <h3 class="font-bold">SEAMLESS</h3>
          </div>
          <div class="border-t-4 border-black pt-4">
            <h3 class="font-bold">EFFICIENT</h3>
          </div>
          <div class="border-t-4 border-black pt-4">
            <h3 class="font-bold">POWERFUL</h3>
          </div>
        </section>

        <section class="space-y-8">
          <h2 class="text-4xl md:text-5xl font-bold">READY TO DOMINATE?</h2>
          <a
            href="#"
            class="inline-block bg-black text-white text-xl font-bold py-4 px-8 hover:bg-gray-800 transition duration-300"
          >
            GET STARTED NOW
          </a>
        </section>

        <p class="text-lg border-t-2 border-black pt-8">TRUSTED BY 10,000+ NEW YORK PROFESSIONALS</p>
      </div>
    </main>

    Example 3:
    <div class="min-h-screen bg-gray-50 text-gray-900">
      <header class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-black text-center">DesignFlow Pro</h1>
      </header>

      <main class="container mx-auto px-4 max-w-4xl">
        <section class="text-center pt-10 pb-20">
          <h2 class="text-6xl font-extrabold mb-6 leading-tight">Elevate Your Design Workflow</h2>
          <p class="text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            DesignFlow Pro is the ultimate tool for designers who want to streamline their process, boost productivity,
            and create stunning designs faster than ever before.
          </p>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-md text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
            Transform Your Design Process
          </button>
        </section>

        <section class="mb-20">
          <div class="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/placeholder.svg"
              alt="DesignFlow Pro Interface"
              class="rounded-xl object-cover w-full h-full"
            />
          </div>
        </section>

        <section class="py-20">
          <h3 class="text-4xl font-bold mb-12 text-center">Why Designers Love DesignFlow Pro</h3>
          <div class="space-y-12">
            <div class="space-y-2">
              <h4 class="text-2xl font-semibold">Intuitive Interface</h4>
              <p class="text-xl text-gray-700 leading-relaxed">Our clean, minimalist interface is designed by designers, for designers. Every tool is exactly where you expect it to be, allowing you to focus on what matters most - your creativity.</p>
            </div>
            <div class="space-y-2">
              <h4 class="text-2xl font-semibold">Smart Automation</h4>
              <p class="text-xl text-gray-700 leading-relaxed">Say goodbye to repetitive tasks. DesignFlow Pro's AI-powered automation handles the mundane, freeing you to tackle the creative challenges that truly require your expertise.</p>
            </div>
            <div class="space-y-2">
              <h4 class="text-2xl font-semibold">Seamless Collaboration</h4>
              <p class="text-xl text-gray-700 leading-relaxed">Share your work, gather feedback, and collaborate in real-time. Our robust sharing features ensure that you're always on the same page with your team and clients.</p>
            </div>
          </div>
        </section>

        <section class="py-20">
          <blockquote class="text-3xl italic font-light mb-6 text-gray-700 text-center">
            "DesignFlow Pro has revolutionized how I approach my design projects. It's like having a super-powered
            design assistant that anticipates my every need."
          </blockquote>
          <div class="flex items-center justify-center">
            <img src="/placeholder.svg" alt="Sarah Chen" width="80" height="80" class="rounded-full mr-4" />
            <div>
              <p class="font-semibold text-xl">Sarah Chen</p>
              <p class="text-gray-600">Lead Designer, InnovateTech</p>
            </div>
          </div>
        </section>

        <section class="py-20">
          <div class="text-center bg-white p-12 rounded-2xl shadow-xl">
            <h3 class="text-4xl font-bold mb-6">Invest in Your Design Future</h3>
            <p class="text-6xl font-bold mb-6 text-blue-600">$79</p>
            <p class="text-2xl text-gray-700 mb-8">One-time purchase, lifetime of design excellence</p>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-md text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
              Elevate Your Design Game
            </button>
            <p class="mt-6 text-gray-600 text-lg">30-day money-back guarantee. No questions asked.</p>
          </div>
        </section>

        <section class="text-center py-20">
          <h2 class="text-5xl font-bold mb-6">Ready to Redefine Your Design Process?</h2>
          <p class="text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Join thousands of designers who have already transformed their workflow with DesignFlow Pro. Your best
            designs are waiting to be unleashed.
          </p>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-md text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
            Start Your Design Revolution
          </button>
        </section>
      </main>

      <footer class="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2025 DesignFlow Pro. Empowering designers to create without limits.</p>
      </footer>
    </div>

    Example 4:
    <div class="min-h-screen bg-white">
      <div class="relative h-[400px] w-full overflow-hidden bg-primary lg:h-[500px]">
        <div class="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HdC69WcwElb9wc5zZsagH7tXWF8Zxa.png')] bg-cover bg-center opacity-25" />
        <div class="container relative flex h-full items-center justify-between">
          <div class="space-y-4">
            <h1 class="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
              Sunlight
            </h1>
            <p class="max-w-[600px] text-lg text-primary-foreground/90 sm:text-xl">
              Yellow Sketchbook - Summer 2018
            </p>
          </div>
        </div>
      </div>

      <main class="container py-8">
        <div class="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div class="space-y-8">
            <div class="flex items-center gap-4">
              <div class="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">$3</div>
              <div class="flex items-center gap-2">
                <span class="font-medium">starpatches</span>
                <div class="flex items-center">
                  <span class="ml-2 text-sm text-muted-foreground">(3 ratings)</span>
                </div>
              </div>
            </div>

            <p class="text-lg text-muted-foreground">
              A 30-page collection of sketches all themed around the colour yellow, from Summer 2018.
            </p>

            <div class="grid gap-4 sm:grid-cols-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HdC69WcwElb9wc5zZsagH7tXWF8Zxa.png"
                alt="Preview of yellow themed sketches"
                width="500"
                height="300"
                class="rounded-lg object-cover"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HdC69WcwElb9wc5zZsagH7tXWF8Zxa.png"
                alt="Preview of yellow themed sketches"
                width="500"
                height="300"
                class="rounded-lg object-cover"
              />
            </div>
          </div>

          <div class="space-y-6 rounded-lg border p-6">
            <button class="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              I want this!
            </button>

            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-sm font-medium">Size</span>
                <span class="text-sm text-muted-foreground">30 MB</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium">Length</span>
                <span class="text-sm text-muted-foreground">36 pages</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button class="flex-1 justify-between" size="sm">
                Add to wishlist
              </button>
              <button size="sm">
                Share
              </button>
            </div>

            <div class="text-center text-sm text-muted-foreground">30-day money back guarantee</div>

            <div class="space-y-2">
              <h3 class="flex items-center gap-2 font-medium">
                Ratings
                <div class="flex items-center">
                  <span class="ml-1 text-sm">5 (3 ratings)</span>
                </div>
              </h3>
              <div class="flex items-center gap-2">
                <span class="w-12 text-sm">5 stars</span>
                <div class="h-2 flex-1 rounded-full bg-muted">
                  <div class="h-full rounded-full bg-primary w-full"></div>
                </div>
                <span class="w-12 text-right text-sm text-muted-foreground">100%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-12 text-sm">4 stars</span>
                <div class="h-2 flex-1 rounded-full bg-muted">
                  <div class="h-full rounded-full bg-primary w-0"></div>
                </div>
                <span class="w-12 text-right text-sm text-muted-foreground">0%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-12 text-sm">3 stars</span>
                <div class="h-2 flex-1 rounded-full bg-muted">
                  <div class="h-full rounded-full bg-primary w-0"></div>
                </div>
                <span class="w-12 text-right text-sm text-muted-foreground">0%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-12 text-sm">2 stars</span>
                <div class="h-2 flex-1 rounded-full bg-muted">
                  <div class="h-full rounded-full bg-primary w-0"></div>
                </div>
                <span class="w-12 text-right text-sm text-muted-foreground">0%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-12 text-sm">1 star</span>
                <div class="h-2 flex-1 rounded-full bg-muted">
                  <div class="h-full rounded-full bg-primary w-0"></div>
                </div>
                <span class="w-12 text-right text-sm text-muted-foreground">0%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function editLandingPagePrompt(text: string, elementHtml: string) {
  return `${BASE_PROMPT}

    Given this HTML element and requested change:
    "${text}"

    Original element: ${elementHtml}

    Return only the updated HTML for this element, nothing else.`;
}
