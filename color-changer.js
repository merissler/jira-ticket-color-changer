const largeNumber = 54572346582436587
let ticketLinkElements, ticketTextElements

window.onload = function () {
	AssignAllTicketColors()
}

function AssignAllTicketColors() {
	ticketLinkElements = GetTicketLinkElements()
	ticketTextElements = GetTicketTextElements()
	for (let i = 0; i < ticketLinkElements.length; i++) {
		let currentTicketLinkElement = ticketLinkElements[i]
		let currentTicketTextElement = ticketTextElements[i]
		let ticketNumber = GetTicketNumber(currentTicketLinkElement)
		if (currentTicketLinkElement.href.includes("browse") && ticketNumber > 0) {
			AssignTicketColor(currentTicketTextElement, ticketNumber)
			AssignTicketColor(currentTicketLinkElement, ticketNumber)
		}
	}
}

var observer = new MutationObserver(function(mutationsList, observer) {
    for (var mutation of mutationsList) {
        AssignAllTicketColors()
    }
});
observer.observe(document.body, { childList: true, subtree: true });

function AssignTicketColor(ticketTextElement, seed) {
	let uniqueHue = (seed * largeNumber) % 360
	let uniqueColor = HsvToHex(uniqueHue, 1, 1)
	ticketTextElement.style = "color: " + uniqueColor.toString() + " !important;"
}

function GetTicketLinkElements() {
	// for https://goodstech.atlassian.net/jira/your-work
	var ticketLinkElements = Array.from(document.getElementsByClassName("bu4bgh-5 dLPyHk"))
	// for https://goodstech.atlassian.net/browse/*
	ticketLinkElements = ticketLinkElements.concat(Array.from(document.querySelectorAll('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]')))
	// for https://goodstech.atlassian.net/jira/dashboards/*
	ticketLinkElements = ticketLinkElements.concat(Array.from(document.getElementsByClassName("issue-link")))
	return ticketLinkElements
}

function GetTicketTextElements() {
	// for https://goodstech.atlassian.net/jira/your-work
	var ticketTexts = Array.from(document.getElementsByClassName("bu4bgh-0 evJEbS"))
	// for https://goodstech.atlassian.net/browse/*
	ticketTexts = ticketTexts.concat(Array.from(document.getElementsByClassName("_1wyb1tcg _vwz41f4h _k48pbfng _1dyzz5jk _1bsb1osq _19pkidpf _2hwxidpf _otyridpf _18u0idpf _ca0qidpf _u5f3idpf _n3tdidpf _19bvidpf _syaz1fxt _osi5fg65 _mc2h1hna _14fy1hna")))
	// for https://goodstech.atlassian.net/jira/dashboards/*
	ticketTexts = ticketTexts.concat(Array.from(document.getElementsByClassName("issue-link")))
	return ticketTexts
}

function GetTicketNumber(ticketElement) {
	return ticketElement.href.match(/\d{4,}/)
}

function HsvToHex(h, s, v) {
    let r, g, b;
    
    let i = Math.floor(h / 60);
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    
    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };

    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}
