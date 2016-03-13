
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
    
    //illegal alien -> human
    v = v.replace(/\b(Illegal Alien|Illegal alien|illegal Alien|illegal alien)(s)?\b/g, "human$2 ('$1$2')");
    
    //illegal immigrant -> human
    v = v.replace(/\b(Illegal Immigrant|Illegal immigrant|illegal Immigrant|illegal immigrant)(s)?\b/g, "human$2 ('$1$2')");
    
    //undocumented immigrant -> human
    v = v.replace(/\b(Undocumented Immigrant|Undocumented immigrant|undocumented Immigrant|undocumented immigrant)(s)?\b/g, "human$2 ('$1$2')");
    
    //illegal immigration -> humans trying to build a better life
    v = v.replace(/\bIllegal Immigration\b/g, "Humans trying to build a better life for themselves");
    v = v.replace(/\bIllegal immigration\b/g, "Humans trying to build a better life for themselves");
    v = v.replace(/\billegal immigration\b/g, "humans trying to build a better life for themselves");
    v = v.replace(/\billegal Immigration\b/g, "humans trying to build a better life for themselves");

    
    //thug -> black person i am afraid of
    ///NOTE THESE QUOTATIONS AREN'T REGISTERED CORRECTLY
    v = v.replace(/\bDangerous Thug\b/g, "Black Person");
    v = v.replace(/\bDangerous thug\b/g, "Black person");
    v = v.replace(/\bdangerous Thug\b/g, "black Person");
    v = v.replace(/\bdangerous thug\b/g, "black person");
    v = v.replace(/\bDangerous Thugs\b/g, "Black People");
    v = v.replace(/\bDangerous thugs\b/g, "Black people");
    v = v.replace(/\bdangerous Thugs\b/g, "black People");
    v = v.replace(/\bdangerous thugs\b/g, "black people");
    
    v = v.replace(/\bOrganized Thug\b/g, "Organized Black Person");
    v = v.replace(/\bOrganized thug\b/g, "Organized Black person");
    v = v.replace(/\borganized Thug\b/g, "organized black Person");
    v = v.replace(/\borganized thug\b/g, "organized black person");
    v = v.replace(/\bOrganized Thugs\b/g, "Organized Black People");
    v = v.replace(/\bOrganized thugs\b/g, "Organized Black people");
    v = v.replace(/\borganized Thugs\b/g, "organized black People");
    v = v.replace(/\borganized thugs\b/g, "organized black people");


	
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