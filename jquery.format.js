var Format = {
	slug: function(text) {

		text = (text) ? text : "";

	    return text
	        .toLowerCase()
	        .replace(/ /g,'-')
	        .replace(/---/g,'-')
	        .replace(/--/g,'-')
	        .replace(/[^\w-]+/g,'')
	        ;
	},
	unslug: function(text) {

		text = (text) ? text : "";
		text = text.replace(/-/g, " ")

		
		return text.toCamelCase();
	}
}

function FORMAT_truncate30(text) {
	return (text.length>30) ? text.substring(0, 30)+"..." : text;
}

function FORMAT_lowercase(text) {
	return text.toLowerCase();
}


function FORMAT_nl2br(text) {
	if (!text) return "";

	return text.replace(/\r?\n/g, '<br />');
}

function FORMAT_slug(text) {
	return Format.slug(text);
}

function FORMAT_archive_date_slug(date) {
	date = moment(date).format("YYYY-MM");
	return date;
}

function FORMAT_truncate_event_title(title) {
	return title.substring(0, 70);
}

function FORMAT_truncate_event_details(content) {
	return (content.length>80) ? content.substring(0, 80)+"..." : content;
}

function FORMAT_truncate_news_details(content) {
	return (content.length>220) ? content.substring(0, 220)+"..." : content;
}

function FORMAT_parse_links(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp, "<a href='$1'>$1</a>"); 
}


// ** DATE AND TIME FORMATS ** //

function FORMAT_from_ago(date){


	if (date) {
		//return moment.unix(date).fromNow();
		timestamp = new Date(Date.parse(date.replace(/( +)/, ' UTC$1')));
	} else {
		timestamp = new Date();
	}
	return moment(timestamp).fromNow();
}

function FORMAT_timestamp(date) {
	date = moment.unix(date).format("DD MMMM, YYYY");
	return date;
}

function FORMAT_date_time(date) {
	date = moment.unix(date).format("MMMM DD, YYYY @ H:mma");
	return date;
}

function FORMAT_archive_date(date) {
	date = moment(date).format("MMMM YYYY");
	return date;
}

function FORMAT_month(date) {
	date = moment(date).format("MMMM");
	return date;
}

function FORMAT_year(date) {
	date = moment(date).format("YYYY");
	return date;
}

function FORMAT_event_date_short(date) {
	date = moment(date).format("MMM Do YYYY");
	return date;
}

function FORMAT_event_date_long(date) {
	date = moment(date).format("MMMM Do YYYY");
	return date;
}

function FORMAT_event_timestamp(date) {
	date = moment.unix(date).toISOString();
	return date;
}

function FORMAT_time(time) {
	date = moment(moment().format('YYYY-MM-DD')+" "+ time).format("H:mma");
	return date;
}

