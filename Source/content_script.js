
function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
                                           rootNode,
                                           NodeFilter.SHOW_TEXT,
                                           null,
                                           false
                                           ),
    node;
    
    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
    textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    
    //illegals -> humans
    v = v.replace(/\bIllegals\b/g, "Humans");
    v = v.replace(/\billegals\b/g, "humans");
    
    
    //undocumented immigrants/illegal aliens/illegal immigrants -> humans trying to build better lives
    v = v.replace(/\b(Undocumented Immigrant|Undocumented immigrant|Illegal Alien|Illegal alien|Illegal Immigrant|Illegal immigrant)\b/g, "Person trying to build a better life");
    v = v.replace(/\b(undocumented Immigrant|undocumented immigrant|illegal Alien|illegal alien|illegal Immigrant|illegal immigrant)\b/g, "person trying to build a better life");
    v = v.replace(/\b(Undocumented Immigrants|Undocumented immigrants|Illegal Aliens|Illegal aliens|Illegal Immigrants|Illegal immigrants)\b/g, "Humans trying to build a better life for themselves");
    v = v.replace(/\b(undocumented Immigrants|undocumented immigrants|illegal Aliens|illegal aliens|illegal Immigrants|illegal immigrants)\b/g, "humans trying to build a better life for themselves");
    
    
    //illegal immigration -> humans trying to build a better life
    v = v.replace(/\bIllegal Immigration\b/g, "Humans trying to build better lives for themselves");
    v = v.replace(/\bIllegal immigration\b/g, "Humans trying to build better lives for themselves");
    v = v.replace(/\billegal immigration\b/g, "humans trying to build better lives for themselves");
    v = v.replace(/\billegal Immigration\b/g, "humans trying to build better lives for themselves");

    
    //dangerous thug -> black person who i am afraid of
    v = v.replace(/\bDangerous Thug\b/g, "Black Person Who I Am Afraid Of");
    v = v.replace(/\bDangerous thug\b/g, "Black person who I am afraid of");
    v = v.replace(/\bdangerous Thug\b/g, "black Person who I Am Afraid Of");
    v = v.replace(/\bdangerous thug\b/g, "black person who I am afraid of");
    v = v.replace(/\bDangerous Thugs\b/g, "Black People Who I Am Afraid Of");
    v = v.replace(/\bDangerous thugs\b/g, "Black people who I am afraid of");
    v = v.replace(/\bdangerous Thugs\b/g, "black People Who I am afraid of");
    v = v.replace(/\bdangerous thugs\b/g, "black people who I am afraid of");
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\bdangerous thugs\b/i, "Black People Who I Am Afraid Of");

    //Here we target cases of the form: Dangerous "thug"
    v = v.replace(/\bDangerous \SThug[,\.]\S/g, "Black Person Who I Am Afraid Of");
    v = v.replace(/\bDangerous \Sthug[,\.]\S/g, "Black person who I am afraid of");
    v = v.replace(/\bdangerous \SThug[,\.]\S/g, "black Person who I Am Afraid Of");
    v = v.replace(/\bdangerous \Sthug[,\.]\S/g, "black person who I am afraid of");
    v = v.replace(/\bDangerous \SThug[,\.]\S/g, "Black Person Who I Am Afraid Of");
    v = v.replace(/\bDangerous \Sthug[,\.]\S/g, "Black person who I am afraid of");
    v = v.replace(/\bdangerous \SThug[,\.]\S/g, "black Person who I Am Afraid Of");
    v = v.replace(/\bdangerous \Sthug[,\.]\S/g, "black person who I am afraid of");
    
    //Here we target cases of the form: Dangerous "thugs."
    v = v.replace(/\bDangerous \SThug\b/g, "Black Person Who I Am Afraid Of");
    v = v.replace(/\bDangerous \Sthug\b/g, "Black person who I am afraid of");
    v = v.replace(/\bdangerous \SThug\b/g, "black Person who I Am Afraid Of");
    v = v.replace(/\bdangerous \Sthug\b/g, "black person who I am afraid of");
    v = v.replace(/\bDangerous \SThugs\S/g, "Black People Who I Am Afraid Of");
    v = v.replace(/\bDangerous \Sthugs\S/g, "Black people who I am afraid of");
    v = v.replace(/\bdangerous \SThugs\S/g, "black People Who I am afraid of");
    v = v.replace(/\bdangerous \Sthugs\S/g, "black people who I am afraid of");
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\bdangerous \Sthugs\S/i, "Black People Who I Am Afraid Of");
    
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\bdangerous \Sthug[,\.]\S/i, "Black Person Who I Am Afraid Of");

    
    //Organized thugs -> organized/organised black people
    v = v.replace(/\bOrgani(z|s)?ed Thugs\b/g, "Organi$1ed Black People");
    v = v.replace(/\bOrgani(z|s)?ed thugs\b/g, "Organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed Thugs\b/g, "Organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed thugs\b/g, "Organi$1ed Black People");
    
    //clean up remaining occurrences of this form with a case-insensitive regex call
    v = v.replace(/\borgani(z|s)?ed thugs\b/i, "Organi$1ed Black People");
    
    
    //here we target cases like: Organi(z|s)ed "thugs."
    v = v.replace(/\bOrgani(z|s)?ed \SThugs[,\.]\S/g, "Organi$1ed Black People");
    v = v.replace(/\bOrgani(z|s)?ed \Sthugs[,\.]\S/g, "Organi$1ed Black people");
    v = v.replace(/\borgani(z|s)?ed \SThugs[,\.]\S/g, "organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed \Sthugs[,\.]\S/g, "organi$1ed black people");
    
    //clean up remaining occurrences of this form with a case-insensitive regex call
    v = v.replace(/\borgani(z|s)?ed \Sthugs[,\.]\S/i, "Organi$1ed Black People");
    
    //here we target cases like: Organi(z|s)ed "thugs"
    v = v.replace(/\bOrgani(z|s)?ed \SThugs\S/g, "Organi$1ed Black People");
    v = v.replace(/\bOrgani(z|s)?ed \Sthugs\S/g, "Organi$1ed black people");
    v = v.replace(/\borgani(z|s)?ed \SThugs\S/g, "organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed \Sthugs\S/g, "organi$1ed black people");
    
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\borgani(z|s)?ed \Sthugs\S/i, "Organi$1ed Black People");
    
    return v;
}


// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;
    
    mutations.forEach(function(mutation) {
                      for (i = 0; i < mutation.addedNodes.length; i++) {
                      if (mutation.addedNodes[i].nodeType === 3) {
                      // Replace the text for text nodes
                      handleText(mutation.addedNodes[i]);
                      } else {
                      // Otherwise, find text nodes within the given node and replace text
                      walk(mutation.addedNodes[i]);
                      }
                      }
                      });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
    characterData: true,
    childList: true,
    subtree: true
    },
    bodyObserver, titleObserver;
    
    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);
    
    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);
    
    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);