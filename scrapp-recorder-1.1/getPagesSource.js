function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

function getMailElementsByClass(document_root) {
    let totalMails = document_root.querySelectorAll("._1xP-XmXM1GGHpRKCCeOKjP");
    let unReadedMails = document_root.querySelectorAll("._1xP-XmXM1GGHpRKCCeOKjP[aria-label^='No leído']");
    let readedMails = document_root.querySelectorAll("._1xP-XmXM1GGHpRKCCeOKjP:not([aria-label^='No leído'])");
    
    let mailSenderReaded = document_root.querySelectorAll("._3J_S6fOI4B5tFT8R6qMqT7");
    let mailSenderUnReaded = document_root.querySelectorAll("._3zJzxRam-s-FYVZNqcZ0BW");  
    let mailSubjects = document_root.querySelectorAll(".eMnO0knJStwnaHYEFIS0w");
    let mailText = document_root.querySelectorAll("._1Cz6QWtbduTKlAyf910p0h");
    let mailDateReaded = document_root.querySelectorAll("._3CVfKgKkHqB5r8nCZCwRgG");
    let mailDateUnReaded = document_root.querySelectorAll("._3CVfKgKkHqB5r8nCZCwRgG._33kDu8YhkrBqlQy3HACYoN");
    
    let mailData = [];
    let readedCounter = 0;
    let unReadedCounter = 0;
    for (let i = 0; i < totalMails.length; i++) {
        let readed = !totalMails[i].getAttribute('aria-label').startsWith("No leído");
        let name// = mailSender[i].getElementsByTagName("span")[0].innerText;
        let email// = mailSender[i].getElementsByTagName("span")[0].title;
        let date
        if(readed) {
            name = mailSenderReaded[readedCounter].getElementsByTagName("span")[0].innerText;
            email = mailSenderReaded[readedCounter].getElementsByTagName("span")[0].title;
            date = mailDateReaded[readedCounter].title;
            readedCounter = readedCounter + 1;
        } else {
            name = mailSenderUnReaded[unReadedCounter].getElementsByTagName("span")[0].innerText;
            email = mailSenderUnReaded[unReadedCounter].getElementsByTagName("span")[0].title;
            date = mailDateUnReaded[readedCounter].title;
            unReadedCounter = unReadedCounter + 1;
        }
        let subject = mailSubjects[i].getElementsByTagName("span")[0].innerText;
        let description = mailText[i].innerText;
        mailData.push('\nE-Mail N°'+(i+1)+'\nName: ' + name + '\nEmail: '+ email +'\nSubject: '
            + subject +'\nDescription: ' + description + '\nReaded: ' + readed + '\nDate: ' + date + '\n');
    }
    return totalMails.length + ' Mails registrados! \nMails no leídos: ' + unReadedMails.length
                                 + '\nMails leídos: ' + readedMails.length + "\n" + mailData.toString();
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getMailElementsByClass(document)
});