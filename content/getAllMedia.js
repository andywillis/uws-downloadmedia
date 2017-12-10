(function () {

  function qsa(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  const illegal = /[%&{}<>*? $!"'\\;,^#|@]/g;

  function fixURL(url) {
    return url.replace(illegal, '-');
  }

  function getMedia(type) {
    return [...qsa(`a[href$=".${type}"]`)].map((el) => {
      return fixURL(el.href);
    });
  }

  function wrangleMedia(info) {
    const media = getMedia(info.type);
    if (media.length) {
      browser.runtime.sendMessage({ type: 'all', media });
    }
  }

  browser.runtime.onMessage.addListener(wrangleMedia);

}());