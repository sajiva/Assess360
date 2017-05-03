class ParticipantParser {


}
ParticipantParser.parseData = function (text) {

    let dealWithEntry = function (line, participant) {
        let participantFormats = ParticipantParser.format.participant;

        let emailMatch = line.match(participantFormats.email.search);
        let nameMatch = line.match(participantFormats.name.search);
        let phoneMatch = line.match(participantFormats.phone.search);

        let order = {};

        order[emailMatch ? (emailMatch.index + emailMatch[0].length) : "-1"] = "email";
        order[nameMatch ? (nameMatch.index + nameMatch[0].length) : "-1"] = "name";
        order[phoneMatch ? (phoneMatch.index + phoneMatch[0].length) : "-1"] = "phone";
        delete order["-1"];
        let keys = Object.keys(order);
        keys.sort();
        let newKeys = [];
        keys.forEach(function (item) {
            newKeys.push({index: item, value: order[item]});
        });
        keys = newKeys;


        let emailExec = participantFormats.email.search.exec(line);
        let nameExec = participantFormats.name.search.exec(line);
        let phoneExec = participantFormats.phone.search.exec(line);

        let emailValue = emailMatch ? emailExec[0].replace(participantFormats.email.search, participantFormats.email.replace) : "Unkown";
        let nameValue = nameMatch ? nameExec[0].replace(participantFormats.name.search, participantFormats.name.replace) : "Unkown";
        let phoneValue = phoneMatch ? phoneExec[0].replace(participantFormats.phone.search, participantFormats.phone.replace) : "Unkown";

        let emailValueHtml = emailMatch ? emailExec[0].replace(participantFormats.email.search, "<span class='email-found'>" + emailValue + "</span>") : "Unkown";
        let nameValueHtml = nameMatch ? nameExec[0].replace(participantFormats.name.search, "<span class='name-found'>" + nameValue + "</span>") : "Unkown";
        let phoneValueHtml = phoneMatch ? phoneExec[0].replace(participantFormats.phone.search, "<span class='phone-found'>" + phoneValue + "</span>") : "Unkown";

        let html = line;
        keys.forEach(function (item) {
            participantFormats[item.value].lastIndex = item.index;
        });
        html = emailMatch ? html.replace(participantFormats.email.search, emailValueHtml) : html;
        html = nameValueHtml ? html.replace(participantFormats.name.search, nameValueHtml) : html;
        html = phoneValueHtml ? html.replace(participantFormats.phone.search, phoneValueHtml) : html;


        keys.forEach(function (item) {
            participantFormats[item.value].lastIndex = 0;
        });

        participant.name = nameValue;
        participant.email = emailValue;
        participant.phone = phoneValue;
        participant.found = (emailMatch || nameMatch || phoneMatch);
        if (participant.found) {
            return "<span class='entry-found'><span class='entry-display'>" + html + "</span><span class='entry-popup'></span></span>";
        }
        else {
            return html;
        }


    };
    let participants = [];
    let finalHtml = text.replace(ParticipantParser.format.participant.search, function (item) {
        let participant = {};
        let html = dealWithEntry(item, participant);
        if (participant.found) {
            participants.push({
                name: participant.name,
                email: participant.email,
                phone: participant.phone
            });
        }

        return html;

    });


    return {
        participants: participants,
        finished: true,
        html: finalHtml
    };

};
ParticipantParser.format = {
    edit: false,
    participant: {
        search: /(.*)(?:[,\n\r]|$)/g,
        name: {
            search: /([A-Za-z]+\s*[A-Za-z\s]+)/,
            replace: "$1"
        },
        email: {
            search: /([0-9a-zA-Z\-_\.=+]*@[\w\-]+\.\w+)/i,
            replace: "$1"
        },
        phone: {
            search: /(\d{3}-?\d{3}-?\d{4}-?)/i,
            replace: "$1"
        }
    }
};

export default ParticipantParser

