
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
    //Note: preservation of specific capitalization patterns is unusually important for this app because so
    //many of these text replacements occur within headlines
    
    
    //illegals -> humans
    v = v.replace(/\bIllegals\b/g, "Humans");
    v = v.replace(/\billegals\b/g, "humans");
    
    
    //undocumented immigrants/illegal aliens/illegal immigrants -> humans trying to build better lives
    //ignore case of first letter second words
    v = v.replace(/\b(Undocumented Immigrant|Illegal Alien|Illegal Immigrant)\b/g, "Person Trying to Build a Better Life");
    v = v.replace(/\b(Undocumented immigrant|Illegal alien|Illegal immigrant)\b/g, "Person trying to build a better life");
    v = v.replace(/\b(undocumented [Ii]mmigrant|illegal [Aa]lien|illegal [Ii]mmigrant)\b/g, "person trying to build a better life");
    v = v.replace(/\b(Undocumented Immigrants|Illegal Aliens|Illegal Immigrants)\b/g, "Humans Trying to Build a Better Life for Themselves");
    v = v.replace(/\b(Undocumented immigrants|Illegal aliens|Illegal immigrants)\b/g, "Humans trying to build a better life for themselves");
    v = v.replace(/\b(undocumented [Ii]mmigrants|illegal [Aa]liens|illegal [Ii]mmigrants)\b/g, "humans trying to build a better life for themselves");
    
    
    //illegal immigration -> humans trying to build a better life
    v = v.replace(/\bIllegal [Ii]mmigration\b/g, "Humans trying to build better lives for themselves");
    v = v.replace(/\billegal [Ii]mmigration\b/g, "humans trying to build better lives for themselves");
    
    //(Dangerous|Violent) thug -> black person who i am afraid of


    //note: in practice, these noun phrases are often used with interior quotes, as in: (Dangerous|Violent) "thug".
    //Here we target occurences of the form: (Dangerous|Violent) "thug."
    // \S picks any non-white-space character
    // must drop \b because punctuation is not recognized as part of a word
    v = v.replace(/\b(Dangerous|Violent) \SThug[,\.]?\S/g, "Black Person Who I Am Afraid Of$1");
    v = v.replace(/\b(Dangerous|Violent) \Sthug[,\.]?\S/g, "Black person who I am afraid of$1");
    v = v.replace(/\b((dangerous|violent)|Violent) \S[Tt]hug[,\.]?\S/g, "Black person who I am afraid of$1");
    v = v.replace(/\b(Dangerous|Violent) \SThug[,\.]?\S/g, "Black Person Who I Am Afraid Of$1");
    v = v.replace(/\b(Dangerous|Violent) \Sthug[,\.]?\S/g, "Black person who I am afraid of$1");
    //clean up remaining occurrences of this form with a case-insensitive regex call
    v = v.replace(/\b(dangerous|violent) \Sthug[,\.]?\S/i, "Black Person Who I Am Afraid Of$1");

    
    //Here we target cases of the form: Dangerous "thugs"
    v = v.replace(/\b(Dangerous|Violent) \SThug\S\b/g, "Black Person Who I Am Afraid Of");
    v = v.replace(/\b(Dangerous|Violent) \Sthug\S\b/g, "Black person who I am afraid of");
    v = v.replace(/\b(dangerous|violent) \S[Tt]hug\S\b/g, "black person who I am afraid of");
    v = v.replace(/\b(Dangerous|Violent) \SThug(s|z)\S/g, "Black People Who I Am Afraid Of");
    v = v.replace(/\b(Dangerous|Violent) \Sthug(s|z)\S/g, "Black people who I am afraid of");
    v = v.replace(/\b(dangerous|violent) \SThug(s|z)\S/g, "black People Who I am afraid of");
    v = v.replace(/\b(dangerous|violent) \Sthug(s|z)\S/g, "black people who I am afraid of");
    //again, clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\b(dangerous|violent) \Sthug(s|z)\S/i, "Black People Who I Am Afraid Of");
    
    v = v.replace(/\b(Dangerous|Violent) Thug\b/g, "Black Person Who I Am Afraid Of");
    v = v.replace(/\b(Dangerous|Violent) thug\b/g, "Black person who I am afraid of");
    v = v.replace(/\b(dangerous|violent) [Tt]hug\b/g, "black person who I am afraid of");
    v = v.replace(/\b(Dangerous|Violent) Thug(s|z)\b/g, "Black People Who I Am Afraid Of");
    v = v.replace(/\b(Dangerous|Violent) thug(s|z)\b/g, "Black people who I am afraid of");
    v = v.replace(/\b(dangerous|violent) [Tt]hug(s|z)\b/g, "black people who I am afraid of");
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\b(dangerous|violent) thug(s|z)\b/i, "Black People Who I Am Afraid Of");
    
    //Organized thugs -> organized/organised black people
    //maintain spelling (organized v. organised)
    
    //here we target cases like: Organi(z|s)ed "thugs."
    v = v.replace(/\bOrgani(z|s)?ed \SThug(s|z)[,\.]?\S/g, "Organi$1ed Black People");
    v = v.replace(/\bOrgani(z|s)?ed \Sthug(s|z)[,\.]?\S/g, "Organi$1ed Black people");
    v = v.replace(/\borgani(z|s)?ed \SThug(s|z)[,\.]?\S/g, "organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed \Sthug(s|z)[,\.]?\S/g, "organi$1ed black people");
    //clean up remaining occurrences of this form with a case-insensitive regex call
    v = v.replace(/\borgani(z|s)?ed \Sthugs[,\.]?\S/i, "Organi$1ed Black People");
    
    //here we target cases like: Organi(z|s)ed "thugs"
    v = v.replace(/\bOrgani(z|s)?ed \SThug(s|z)\S/g, "Organi$1ed Black People");
    v = v.replace(/\bOrgani(z|s)?ed \Sthug(s|z)\S/g, "Organi$1ed black people");
    v = v.replace(/\borgani(z|s)?ed \SThug(s|z)\S/g, "organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed \Sthug(s|z)\S/g, "organi$1ed black people");
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\borgani(z|s)?ed \Sthug(s|z)\S/i, "Organi$1ed Black People");
    
    v = v.replace(/\bOrgani(z|s)?ed Thug(s|z)\b/g, "Organi$1ed Black People");
    v = v.replace(/\bOrgani(z|s)?ed thug(s|z)\b/g, "Organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed Thug(s|z)\b/g, "Organi$1ed Black People");
    v = v.replace(/\borgani(z|s)?ed thug(s|z)\b/g, "Organi$1ed Black People");
    //clean up remaining occurrences of this form with a case-insensitive regex call
    v = v.replace(/\borgani(z|s)?ed thugs\b/i, "Organi$1ed Black People");
    
    
    //welfare queens -> women receiving government aid
    //the . between welfare and queen allows us to capture "welfare-queen"
    v = v.replace(/\bWelfare.queen\b/g, "Woman receiving government aid");
    v = v.replace(/\bWelfare.Queen\b/g, "Woman Receiving Government Aid");
    v = v.replace(/\bwelfare.[Qq]ueen\b/g, "woman receiving government aid");
    v = v.replace(/\bWelfare.queens\b/g, "Women receiving government aid");
    v = v.replace(/\bWelfare.Queens\b/g, "Women Receiving Government Aid");
    v = v.replace(/\bwelfare.[Qq]ueens\b/g, "women receiving government aid");
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\bwelfare.queen\b/i, "Woman Receiving Government Aid");
    v = v.replace(/\bwelfare.queens\b/i, "Women Receiving Government Aid");
              
    //welfare mom -> poor woman providing for her children (probably can do better than this)
    v = v.replace(/\bWelfare (Mom|Mother)\b/g, "Poor Woman Providing For Her Children");
    v = v.replace(/\bWelfare (Moms|Mothers)\b/g, "Poor Women Providing For Their Children");
    v = v.replace(/\bWelfare (mom|mother)\b/g, "Poor woman providing for her children");
    v = v.replace(/\bWelfare (moms|mothers)\b/g, "Poor women providing for their children");
    v = v.replace(/\bwelfare [Mm](om|other)\b/g, "poor woman providing for her children");
    v = v.replace(/\bwelfare [Mm](oms|others)\b/g, "poor women providing for her children");
    //clean up remaining occurrences with a case-insensitive regex call
    v = v.replace(/\bwelfare (mom|mother)\b/i, "Woman Receiving Government Aid");
    v = v.replace(/\bwelfare (moms|mothers)\b/i, "Women Receiving Government Aid");
    
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