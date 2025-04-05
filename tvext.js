// M3U লিংক (এটি আপনার প্রদান করা M3U লিংক হতে পারে)
const m3uLink = "https://m3u.ch/pl/8426ce950c66ac6ced0aeca5279c6ad4_f0249c08c3cdee6e987db25461ef37c8.m3u";

// M3U ফাইল থেকে স্ট্রিম লিংক লোড করার ফাংশন
async function loadM3U() {
  try {
    // M3U ফাইলের কন্টেন্ট ফেচ করা
    const response = await fetch(m3uLink);
    const m3uData = await response.text();

    // M3U ডেটা পার্স করা
    const streamLinks = parseM3U(m3uData);

    // যদি স্ট্রিম লিংক পাওয়া যায় তবে ব্যবহার করা যাবে
    if (streamLinks.length > 0) {
      console.log("M3U স্ট্রিম লিংক:", streamLinks);
      // এখানে আপনি স্ট্রিম প্লে করতে চাইলে আপনার প্লেয়ার কন্ট্রোল রাখতে পারেন
    }
  } catch (error) {
    console.error("M3U লিংক লোড করতে সমস্যা:", error);
  }
}

// M3U ডেটা থেকে স্ট্রিম লিংক পার্স করা
function parseM3U(m3uData) {
  const lines = m3uData.split("\n"); // M3U ফাইলের লাইনগুলো আলাদা করা
  const streamLinks = [];

  // লাইনগুলো পার্স করা এবং স্ট্রিম লিংক বের করা
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] && !lines[i].startsWith("#")) {  // #EXTINF বা অন্য ট্যাগ বাদ দেওয়া
      streamLinks.push(lines[i].trim());  // স্ট্রিম লিংক অ্যারেতে যোগ করা
    }
  }

  return streamLinks;  // স্ট্রিম লিংক গুলো রিটার্ন করা
}

// পেইজ লোড হলে M3U লিংক লোড হবে
loadM3U();
