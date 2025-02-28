export const EXAMPLE5 = `
<div class="min-h-screen bg-[#FFDE59] font-mono">
  <!-- Header -->
  <header class="border-b-4 border-black p-4 bg-white">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-black">DIGITAL NOMAD KIT</div>
      <button class="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white font-bold rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
        Buy Now
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-16 px-4">
    <div class="container mx-auto">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="space-y-6">
          <div class="inline-block bg-[#00FFCA] px-4 py-2 border-4 border-black font-bold rotate-[-2deg]">
            BEST SELLER • 5,000+ SOLD
          </div>
          <h1 class="text-5xl md:text-7xl font-black leading-tight">The Ultimate Digital Nomad Toolkit</h1>
          <p class="text-xl border-l-4 border-black pl-4">
            Everything you need to work from anywhere. Templates, guides, and resources to make remote work actually
            work.
          </p>
          <div class="flex gap-4 pt-4">
            <button class="bg-black hover:bg-black/90 text-white font-bold text-lg rounded-none border-4 border-black px-8 py-6 shadow-[8px_8px_0px_0px_rgba(255,51,102,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,51,102,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              Get it for $49 ➔
            </button>
            <button class="bg-white hover:bg-gray-100 font-bold text-lg rounded-none border-4 border-black px-8 py-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
              Learn More
            </button>
          </div>
          <div class="flex items-center gap-2 pt-4">
            <div class="flex">
              <span class="w-5 h-5">★</span>
              <span class="w-5 h-5">★</span>
              <span class="w-5 h-5">★</span>
              <span class="w-5 h-5">★</span>
              <span class="w-5 h-5">★</span>
            </div>
            <span class="font-bold">4.9/5 from 230+ reviews</span>
          </div>
        </div>
        <div class="relative">
          <div class="absolute inset-0 bg-[#FF3366] translate-x-4 translate-y-4 border-4 border-black"></div>
          <div class="relative border-4 border-black bg-white p-4">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Digital Nomad Kit Preview"
              width="600"
              height="600"
              class="w-full h-auto border-2 border-black"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-16 px-4 bg-[#00FFCA] border-y-4 border-black">
    <div class="container mx-auto">
      <h2 class="text-4xl md:text-5xl font-black mb-12 text-center">
        <span class="bg-white px-4 py-2 border-4 border-black inline-block -rotate-1">WHAT'S INCLUDED</span>
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div class="text-4xl mb-4">📝</div>
          <h3 class="text-xl font-bold mb-2">50+ Notion Templates</h3>
          <p>Project management, client tracking, expense tracking, and more.</p>
        </div>
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div class="text-4xl mb-4">📚</div>
          <h3 class="text-xl font-bold mb-2">Remote Work Playbook</h3>
          <p>200-page guide on how to find remote work and thrive as a digital nomad.</p>
        </div>
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div class="text-4xl mb-4">💰</div>
          <h3 class="text-xl font-bold mb-2">Tax & Finance Guide</h3>
          <p>How to handle taxes, banking, and finances while working internationally.</p>
        </div>
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div class="text-4xl mb-4">🌎</div>
          <h3 class="text-xl font-bold mb-2">Destination Database</h3>
          <p>Details on 50+ digital nomad hotspots with cost of living, internet, and more.</p>
        </div>
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div class="text-4xl mb-4">⏱️</div>
          <h3 class="text-xl font-bold mb-2">Productivity System</h3>
          <p>Complete system for staying productive while traveling and working remotely.</p>
        </div>
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div class="text-4xl mb-4">👥</div>
          <h3 class="text-xl font-bold mb-2">Private Community</h3>
          <p>Access to our exclusive community of 1,000+ digital nomads worldwide.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-16 px-4">
    <div class="container mx-auto">
      <h2 class="text-4xl md:text-5xl font-black mb-12 text-center">
        <span class="bg-[#FF3366] text-white px-4 py-2 border-4 border-black inline-block rotate-1">
          SIMPLE PRICING
        </span>
      </h2>
      <div class="max-w-3xl mx-auto bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h3 class="text-3xl font-black">Digital Nomad Kit</h3>
            <p class="text-lg">Everything you need in one package</p>
          </div>
          <div class="text-center">
            <div class="text-lg line-through">$99</div>
            <div class="text-5xl font-black">$49</div>
            <div class="text-sm font-bold bg-[#FFDE59] px-2 py-1 border-2 border-black inline-block mt-2">
              50% OFF - LIMITED TIME
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">50+ Notion Templates</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">200-page Remote Work Playbook</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">Tax & Finance Guide</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">Destination Database</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">Productivity System</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">Private Community Access</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">Email Support</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 text-[#FF3366]">✓</span>
            <span class="font-medium">Free Updates</span>
          </div>
        </div>
        <button class="w-full bg-black hover:bg-black/90 text-white font-bold text-lg rounded-none border-4 border-black px-8 py-6 shadow-[8px_8px_0px_0px_rgba(255,51,102,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,51,102,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
          Get Instant Access ➔
        </button>
        <div class="text-center mt-4 font-medium">One-time payment. No subscription. Lifetime access.</div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-16 px-4 bg-[#FF3366] border-y-4 border-black">
    <div class="container mx-auto">
      <h2 class="text-4xl md:text-5xl font-black mb-12 text-center text-white">
        <span class="bg-white text-black px-4 py-2 border-4 border-black inline-block -rotate-2">
          WHAT PEOPLE SAY
        </span>
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-all">
          <div class="flex mb-4">
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
          </div>
          <p class="text-lg mb-4">"This kit saved me so much time. The Notion templates alone are worth the price."</p>
          <div class="font-bold">Sarah K.</div>
          <div class="text-sm">Freelance Designer</div>
        </div>
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-all">
          <div class="flex mb-4">
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
          </div>
          <p class="text-lg mb-4">"I've been traveling for 2 years and this is the most comprehensive resource I've found."</p>
          <div class="font-bold">Mark T.</div>
          <div class="text-sm">Software Developer</div>
        </div>
        <div class="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-all">
          <div class="flex mb-4">
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
            <span class="w-5 h-5 fill-[#FFDE59] stroke-black">★</span>
          </div>
          <p class="text-lg mb-4">"The tax guide helped me save thousands of dollars. Seriously, get this if you work remotely."</p>
          <div class="font-bold">Jessica M.</div>
          <div class="text-sm">Digital Marketer</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="py-16 px-4">
    <div class="container mx-auto max-w-4xl">
      <h2 class="text-4xl md:text-5xl font-black mb-12 text-center">
        <span class="bg-black text-white px-4 py-2 border-4 border-black inline-block rotate-1">
          FREQUENTLY ASKED QUESTIONS
        </span>
      </h2>
      <div class="space-y-6">
        <div class="bg-white border-4 border-black p-6">
          <h3 class="text-xl font-bold mb-2">How do I access the kit after purchase?</h3>
          <p>You'll receive an email with download instructions immediately after purchase. All files are digital and can be accessed instantly.</p>
        </div>
        <div class="bg-white border-4 border-black p-6">
          <h3 class="text-xl font-bold mb-2">Are there any recurring fees?</h3>
          <p>No! This is a one-time purchase with lifetime access to all materials and future updates.</p>
        </div>
        <div class="bg-white border-4 border-black p-6">
          <h3 class="text-xl font-bold mb-2">Can I use these templates for client work?</h3>
          <p>Yes! You can use the templates for your own work and for client projects. The only restriction is reselling them as your own products.</p>
        </div>
        <div class="bg-white border-4 border-black p-6">
          <h3 class="text-xl font-bold mb-2">What if I'm not satisfied with my purchase?</h3>
          <p>We offer a 30-day money-back guarantee. If you're not happy with your purchase, just email us and we'll process your refund.</p>
        </div>
        <div class="bg-white border-4 border-black p-6">
          <h3 class="text-xl font-bold mb-2">Do you offer support?</h3>
          <p>Yes! You'll get access to email support and our private community where you can ask questions and get help.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="py-16 px-4 bg-[#FFDE59] border-t-4 border-black">
    <div class="container mx-auto max-w-4xl text-center">
      <h2 class="text-4xl md:text-6xl font-black mb-6">Ready to work from anywhere?</h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        Join 5,000+ digital nomads who are using our kit to travel the world while working remotely.
      </p>
      <button class="bg-black hover:bg-black/90 text-white font-bold text-xl rounded-none border-4 border-black px-10 py-8 shadow-[8px_8px_0px_0px_rgba(255,51,102,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,51,102,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
        Get the Digital Nomad Kit for $49 ➔
      </button>
      <div class="mt-6 font-medium">One-time payment • Instant access • 30-day money-back guarantee</div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-black text-white py-8 px-4 border-t-4 border-[#FF3366]">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-xl font-black mb-4 md:mb-0">DIGITAL NOMAD KIT</div>
        <div class="flex gap-6">
          <a href="#" class="hover:text-[#FFDE59]">
            Terms
          </a>
          <a href="#" class="hover:text-[#FFDE59]">
            Privacy
          </a>
          <a href="#" class="hover:text-[#FFDE59]">
            Contact
          </a>
        </div>
      </div>
      <div class="text-center mt-8 text-sm">
        © 2023 Digital Nomad Kit. All rights reserved.
      </div>
    </div>
  </footer>
</div>`;

export const EXAMPLE5_NAME = "Neobrutalist Gumroad";
export const EXAMPLE5_DESCRIPTION =
  "A vibrant neobrutalist design with bold colors and chunky borders, perfect for people who want a more crazy, unique, colorful vibe.";
