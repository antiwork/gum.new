export const EXAMPLE6 = `
<div class="min-h-screen font-sans">
  <!-- Header -->
  <header class="flex flex-row w-full justify-between items-center p-5 lg:py-10 lg:px-20">
    <div class="flex flex-row items-center gap-4">
      <input type="checkbox" id="menu-toggle" class="hidden" />
      <label for="menu-toggle" class="cursor-pointer lg:hidden">
        <img src="/menu.svg" alt="Menu" class="size-6" />
      </label>
      <nav class="flex flex-col lg:hidden space-y-4 bg-gray-5 backdrop-blur-3xl p-4 fixed inset-0 z-50 text-white text-6xl opacity-0 pointer-events-none [#menu-toggle:checked+label+&]:opacity-100 [#menu-toggle:checked+label+&]:pointer-events-auto transition-opacity duration-200">
        <div class="flex justify-between items-center pb-4 pt-4 pl-1">
          <label for="menu-toggle" class="cursor-pointer">
            <img src="/close.svg" alt="Close" class="size-6 text-white">
          </label>
        </div>
        <div class="overflow-y-auto h-full [&>a]:border-b-2 [&>a]:border-gray-1/10 [&>a]:py-4 [&>a]:px-2">
          <a href="#testimonials" class="text-body-1/17 block">Testimonials</a>
          <a href="#benefits" class="text-body-1/17 block">Benefits</a>
          <a href="#features" class="text-body-1/17 block">Features</a>
          <a href="#pricing" class="text-body-1/17 block">Pricing</a>
          <a href="#faq" class="text-body-1/17 block">FAQ</a>
        </div>
      </nav>
      <img src="/logo.png" alt="Logotype" width="118" height="29" />
    </div>
    <nav class="hidden lg:flex flex-row space-x-10">
      <a href="#testimonials" class="text-body-1/17">Testimonials</a>
      <a href="#benefits" class="text-body-1/17">Benefits</a>
      <a href="#features" class="text-body-1/17">Features</a>
      <a href="#pricing" class="text-body-1/17">Pricing</a>
      <a href="#faq" class="text-body-1/17">FAQ</a>
    </nav>
    <a href="#pricing">
      <button class="bg-white text-black border-color border-1 rounded-full h-12 px-4">
        Get it now
      </button>
    </a>
  </header>

  <!-- Hero Section -->
  <section class="relative overflow-clip w-full h-[800px] lg:h-[985px] flex flex-col items-center mt-20 gap-4">
    <div class="flex flex-row gap-2">
      <div class="flex flex-row">
        <img src="/customer-1.svg" class="size-6" alt="">
        <img src="/customer-2.svg" class="size-6 -ml-2" alt="">
        <img src="/customer-3.svg" class="size-6 -ml-2" alt="">
        <img src="/customer-4.svg" class="size-6 -ml-2" alt="">
      </div>
      <span class="text-gray-4">
        400+ customers
      </span>
    </div>
    <div class="relative h-fit w-fit z-20 lg:mb-32">
      <img class="absolute -bottom-5 left-1.5 lg:-bottom-14 lg:left-9 -rotate-3 border-white w-[75px] h-[75px] lg:w-[154px] lg:h-[154px]" src="/notion-logo.png" alt="Notion Logo" />
      <h1 class="text-headline-1/10 lg:text-headline-1/17 text-center font-semibold tracking-tighter">
        All-in-one Notion <br />
        <span class="ml-10 lg:ml-32"> workspace</span>
      </h1>
    </div>
    <span class="lg:hidden z-20 px-20 text-center mt-3 backdrop-blur-2xl text-base text-gray-3">
      Built to help agency owners save time & reclaim freedom
    </span>
    <a href="#pricing" class="lg:hidden block w-40 h-12">
      <button class="bg-gray-6 shadow-[0px_6px_24px_0px_rgba(52,52,52,0.40)] flex items-center justify-between pl-4 z-40 rounded-full p-1 gap-3">
        <span class="text-white font-semibold w-fit">
          Get it now
        </span>
        <div class="rounded-full bg-white">
          <img src="/arrow-click.svg" class="size-10" />
        </div>
      </button>
    </a>
    <div class="relative w-full flex justify-center items-stretch content-stretch">
      <div class="hidden lg:block z-20 backdrop-blur-2xl absolute text-base text-gray-3 top-[2px] left-1/2 w-[calc(58ch+10px)] text-center -translate-x-1/2 py-2 pb-[calc(theme(spacing.4)+0.5px)] bg-gradient-to-r from-[hsla(0,0%,96%,44%)] to-[hsla(0,0%,98%,60%)] rounded-t-[50px]">
        Built to help agency owners save time & reclaim freedom
      </div>
      <div class="mt-10 z-0 w-[1045px] h-[345px] lg:h-[510px] backdrop-blur-2xl translate-x-1/5 md:translate-x-0 bg-gradient-to-r from-[hsla(0,0%,96%,44%)] to-[hsla(0,0%,98%,60%)] rounded-t-[50px] lg:rounded-[50px] p-3">
        <img src="/product-image.png" class="relative z-30 rounded-t-[40px] lg:rounded-[40px] h-full w-full object-cover" />
        <a href="#pricing" class="hidden lg:block w-40 h-12">
          <button class="bg-gray-6 shadow-[0px_6px_24px_0px_rgba(52,52,52,0.40)] flex items-center justify-between pl-4 z-40 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full p-2 gap-3">
            <span class="text-white font-semibold w-fit">
              Get it now
            </span>
            <div class="rounded-full bg-white">
              <img src="/arrow-click.svg" class="size-10" />
            </div>
          </button>
        </a>
        <div class="absolute bottom-3 lg:rounded-b-[40px] z-30 lg:h-[450px] bg-gradient-to-b from-transparent to-black/40 w-full max-w-[calc(100%-theme(spacing.6))]" />
      </div>
    </div>
    <img class="absolute scale-105 -left-4 -right-4 bottom-0 md:-bottom-13 -z-10 lg:-top-[450px] lg:bottom-auto w-full lg:w-[calc(100%+theme(spacing.8))] h-full md:h-auto" src="/texture-bg.svg" alt="" />
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="-mt-44 overflow-clip relative w-full h-fit flex flex-col items-center bg-gray-5 z-40 py-16">
    <img src="/section-crown.svg" class="absolute top-0 -translate-y-[46%] z-40" />
    <div class="grid grid-flow-col auto-cols-[288px] gap-4 p-2">
      <div class="flex flex-col justify-between px-8 py-6 text-white gap-4 rounded-2xl border-[1.8px] border-[#1A1A1A] bg-black/20 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.15)_inset,0.9px_-0.9px_0px_0px_rgba(71,71,71,0.10),-0.9px_-0.9px_0px_0px_rgba(71,71,71,0.40)]">
        <div>
          <p class="text-base font-medium">Everything just flows now</p>
          <p class="text-base">Tasks, clients, and finances, finally organized in one simple dashboard.</p>
        </div>
        <span class="font-medium gap-2 flex flex-row">
          <img src="/customer-1.svg" class="size-7" />
          <p class="text-base">Lisa – Visionary Labs</p>
        </span>
      </div>
      <!-- More testimonials would go here -->
    </div>
    <div class="flex flex-col lg:flex-row text-white items-center justify-center gap-5 my-5">
      <span>
        We love our users and thankfully they love us too.
      </span>
      <button class="bg-transparent border-color border-1 rounded-full h-12 p-1 flex flex-row pl-4 gap-5 justify-center items-center">
        Join our community
        <div class="rounded-full bg-white">
          <img src="/arrow-click.svg" class="size-10" />
        </div>
      </button>
    </div>
  </section>

  <!-- Benefits Section -->
  <section id="benefits" class="overflow-clip relative w-full h-fit flex flex-col items-center bg-white z-40 py-20 lg:py-44">
    <div class="flex flex-col items-center gap-2 lg:gap-4 text-center px-7">
      <div class="relative rounded-full bg-gray-5 w-28 h-9 text-white inner-shadow border border-gray-1 flex flex-row items-center justify-center">
        <img src="/label-texture-bg.svg" class="absolute inset-0 w-full h-full" />
        <div class="relative z-10 flex text-sm flex-row gap-2 items-center justify-center">
          <img src="/star-icon.svg" class="size-4" />
          <p>Benefits</p>
        </div>
      </div>
      <h2 class="text-headline-2/10 lg:text-headline-2/17 text-center font-semibold tracking-tighter mt-2 lg:mt-1">
        Everything in one place
      </h2>
      <p class="flex flex-row text-gray-2 gap-4 p-2 max-w-[520px]">The system that keeps everything organized so you
        <br class="hidden lg:block" /> can focus on growing your business
      </p>
    </div>
    <div class="flex flex-row flex-wrap gap-4 justify-center mt-10 max-w-6xl mx-auto px-7">
      <div class="flex flex-col max-w-[max(theme(spacing.44),100%)] lg:w-72 p-6 rounded-xl gap-1 bg-[#FAFAFA]">
        <img src="/folders.svg" alt="Client Projects" class="size-10 mb-4" />
        <h3 class="font-semibold text-base">Client Projects</h3>
        <p class="text-gray-2 text-sm">Manage multiple projects, clients, and services seamlessly.</p>
      </div>
      <!-- More benefit cards would go here -->
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="relative overflow-clip px-2 pt-44 lg:px-32 lg:pt-24 w-full gap-10 flex flex-col items-center bg-gray-0 z-40">
    <div class="lg:hidden flex flex-col px-10 gap-3 lg:gap-4 items-center text-center">
      <div class="relative rounded-full bg-gray-5 w-28 h-9 text-white inner-shadow border border-gray-1 flex flex-row items-center justify-center">
        <img src="/label-texture-bg.svg" class="absolute inset-0 w-full h-full" />
        <div class="relative z-10 flex text-sm flex-row gap-2 items-center justify-center">
          <img src="/star-icon.svg" class="size-4" />
          <p>Features</p>
        </div>
      </div>
      <h2 class="text-headline-2/10 lg:text-headline-2/17 mt-2 lg:mt-1 text-center font-semibold tracking-tighter">
        Take a look inside
      </h2>
      <p class="flex flex-row text-gray-2 gap-4 max-w-[520px]">Get a sneak peek inside the system that simplifies
        and streamlines your agency's workflow</p>
    </div>
    <div class="h-full max-w-[940px] w-full bg-white rounded-t-[40px] lg:rounded-t-[80px] p-10 lg:p-20 border-8 border-gray-2/5 translate-y-8">
      <!-- Feature content would go here -->
    </div>
    <img src="/white-texture-bg.svg" class="absolute inset-x-0 -z-10 bottom-0 w-full" />
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="relative py-20 lg:h-[862px] w-full bg-gray-5 flex flex-row items-center justify-center">
    <div class="max-w-[940px] flex flex-col lg:flex-row gap-5 lg:gap-10 items-center justify-center">
      <div class="flex px-10 flex-col h-fit gap-2 lg:gap-4 items-center text-center lg:items-start lg:text-left pb-10 text-white lg:max-w-[450px]">
        <div class="relative rounded-full bg-gray-5 w-28 h-9 text-white shadow-inner border border-gray-1/10 flex flex-row items-center justify-center">
          <img src="/label-texture-bg.svg" class="absolute inset-0 w-full h-full" />
          <div class="relative z-10 flex text-sm flex-row gap-2 items-center justify-center">
            <img src="/star-icon.svg" class="size-4" />
            <p>Pricing</p>
          </div>
        </div>
        <h2 class="text-headline-2/10 mt-2 lg:mt-1 lg:text-headline-2/17 font-semibold tracking-tighter">
          Pay once, <br class="hidden lg:block" /> use forever
        </h2>
        <p class="text-white/60 flex flex-row gap-4 p-2 max-w-[520px]">Enjoy lifetime access, community
          support,
          and no subscription fees.</p>
      </div>
      <div class="flex w-[360px] max-w-screen lg:w-[450px] flex-col h-fit py-10 p-8 lg:p-10 text-white gap-6 rounded-[40px] border-[1.8px] border-[#1A1A1A] bg-black/20 shadow-[0px_-4px_3px_0px_rgba(0,0,0,0.35)_inset,0.9px_-0.9px_0px_0px_rgba(71,71,71,0.80),-0.9px_-0.9px_0px_0px_rgba(71,71,71,0.80)] backdrop-blur-[1.8px]">
        <h3 class="text-2xl font-medium">
          Agency OS Template
        </h3>
        <p class="text-5xl font-medium my-3">
          $199
        </p>
        <ul class="flex flex-col gap-2">
          <li class="space-x-2 flex flex-row items-center">
            <img src="/check.svg" class="size-4" />
            <p class="font-[400] text-gray-1/60">
              Template access
            </p>
          </li>
          <!-- More pricing features would go here -->
        </ul>
        <div class="border-b border-gray-1/20 bg-black h-[2px] w-full"> </div>
        <a href="#buyitlink" class="w-full h-8 lg:h-12">
          <button class="bg-white py-6 lg:py-8 text-xl lg:text-2xl w-full font-medium text-gray-5 rounded-full h-full p-1 flex flex-row pl-6 gap-5 justify-between items-center shadow-[0px_-1px_0px_0px_#B8B8B8_inset,0px_0px_0px_1px_rgba(255,255,255,0.90)_inset,0px_14px_14px_-10px_#CFCFCF_inset,0px_4px_4px_0px_rgba(0,0,0,0.10),0px_0px_0px_0.5px_rgba(0,0,0,0.25),1px_2px_25px_-6px_#959595,0px_4px_3px_0px_rgba(0,0,0,0.36)]">
            <span>
              Get it now
            </span>
            <img src="/arrow-click-thin.svg" class="size-12 bg-transparent" />
          </button>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="overflow-clip relative w-full h-fit flex flex-col items-center bg-white z-40 py-20 lg:py-44">
    <div class="flex flex-col items-center gap-2 lg:gap-4 text-center px-7 max-w-[940px]">
      <div class="relative rounded-full bg-gray-5 w-28 h-9 text-white inner-shadow border border-gray-1 flex flex-row items-center justify-center">
        <img src="/label-texture-bg.svg" class="absolute inset-0 w-full h-full" />
        <div class="relative z-10 flex text-sm flex-row gap-2 items-center justify-center">
          <img src="/star-icon.svg" class="size-4" />
          <p>FAQ</p>
        </div>
      </div>
      <h2 class="text-headline-2/10 lg:text-headline-2/17 text-center font-semibold tracking-tighter mt-2 lg:mt-1">
        Still have questions?
      </h2>
      <p class="flex flex-row text-gray-2 gap-4 p-2 max-w-[520px]">
        Get the answers you need before getting started
      </p>
    </div>
    <div class="max-w-[940px] w-full mt-10 px-7">
      <details class="group group border-b border-gray-2/20 py-5 bg-gray-0 px-5 [&[open]]:font-medium font-normal [&[open]]:bg-gray-3/8 rounded-t-3xl">
        <summary class="flex justify-between items-center cursor-pointer">
          <h3 class="text-base lg:text-xl">How does this work?</h3>
          <img src="/chevron-down.svg" class="size-5 group-[&[open]]:rotate-180 duration-150" />
        </summary>
        <div class="pt-4 text-gray-3 font-normal">
          <p>After purchase, you'll receive a link to duplicate the template into your Notion account.
            If you're new to Notion, we've included a video to help you get started.</p>
        </div>
      </details>
      <!-- More FAQ items would go here -->
    </div>
  </section>

  <!-- Footer -->
  <footer class="relative pt-28 lg:pt-44 px-10 lg:px-28 overflow-clip w-full h-[655px] lg:h-[785px] bg-[#FAFAFA] flex flex-col items-center mt-20 gap-4">
    <div class="flex flex-row gap-2">
      <div class="flex flex-row">
        <img src="/customer-1.svg" class="size-6" alt="">
        <img src="/customer-2.svg" class="size-6 -ml-2" alt="">
        <img src="/customer-3.svg" class="size-6 -ml-2" alt="">
        <img src="/customer-4.svg" class="size-6 -ml-2" alt="">
      </div>
      <span class="text-gray-4">
        400+ customers
      </span>
    </div>
    <div class="relative h-fit w-fit z-20 mb-4 lg:mb-10">
      <h1 class="text-headline-1/10 lg:text-headline-1/17 text-center font-semibold tracking-tighter">
        Ready to streamline <br class="hidden lg:block" /> your agency?
      </h1>
    </div>
    <a href="#pricing" class="w-40 h-12 lg:scale-110">
      <button class="bg-gray-6 shadow-[0px_6px_24px_0px_rgba(52,52,52,0.40)] flex items-center justify-between !pl-4 z-40 rounded-full p-1 lg:p-2 gap-3">
        <span class="text-white font-semibold w-fit">
          Get it now
        </span>
        <div class="rounded-full bg-white">
          <img src="/arrow-click.svg" class="size-10" />
        </div>
      </button>
    </a>
    <img class="absolute inset-x-0 h-full z-0 w-full lg:h-auto" src="/footer-bg.svg" alt="" />
    <div class="text-center lg:text-start bottom-4 absolute flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between w-full lg:max-w-[calc(100vw-200px)]">
      <p class="py-2 px-4 text-sm lg:text-base rounded-full bg-gray-2/50 backdrop-blur-3xl text-white">
        © <span id="year"></span> AgencyOS. All rights reserved · Privacy Policy
      </p>
      <p class="py-2 px-4 text-sm lg:text-base rounded-full bg-gray-2/50 backdrop-blur-3xl text-white">
        <a href="https://x.com/_productfactory" target="_blank" class="hover:underline">X</a> <span class="mx-2">·</span>
        <a href="https://www.linkedin.com/" target="_blank" class="hover:underline">Linkedin</a> <span class="mx-2">·</span>
        <a href="https://www.instagram.com/" target="_blank" class="hover:underline">Instagram</a>
      </p>
    </div>
  </footer>
</div>`;

export const EXAMPLE6_NAME = "Notion AgencyOS";
export const EXAMPLE6_DESCRIPTION =
  "A clean, modern landing page for Notion-based agency services with a focus on workspace organization and productivity.";
