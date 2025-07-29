function convertTwitter(url) {
  const regex = /(.*\.\w{1,3})/;
  const newUrl = url.replace(regex, "nitter.net");
  return newUrl;
}

/** @param {string} url: */
function convertInstagram(url) {
  const regex = /\/(\/?p?\/?\w*)\/(?:\s|$)/;
  const match = url.replace("/reel/", "/p/").match(regex);
  if (match) {
    const newUrl = `imginn.com/${match[1]}`;
    return newUrl;
  }
}

function convertYoutube(url) {}

function convertReddit(url) {}

function convertUrl(url) {}

/** @param {string} url: */
function inferService(url) {
  const regex = /(?:https?:\/\/)?(?:www.)?(.+)\./;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  if (url.includes("x.com") || url.includes("twitter")) {
    return "twitter";
  }
  if (url.includes("youtube")) {
    return "youtube";
  }
  if (url.includes("instagram")) {
    console.log("instaaaa");
    return "instagram";
  }
  if (url.includes("reddit")) {
    return "reddit";
  }
}

function setNewLink(url) {
  const outputElement = document.querySelector(".output");
  const link = document.createElement("a");
  link.innerHTML = url;
  link.href = `https://${url}`;
  link.target = "_blank";
  outputElement.innerHTML = "";
  outputElement.appendChild(link);
}

/** @param {string} value */
function onInput(value) {
  const service = inferService(value);
  switch (service) {
    case "twitter":
    case "x":
      setNewLink(convertTwitter(value));
      break;
    case "instagram":
      setNewLink(convertInstagram(value));
      break;
    case "youtube":
      break;
    case "reddit":
      break;
    default:
      return;
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector('input[name="converter"]')
    .addEventListener("input", (e) => {
      const value = e.target.value;
      onInput(value);
    });
});
