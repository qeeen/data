var data;
var total_played = 0;
var total_pwar = 0;
var total_inner = 0;
var total_disco = 0;
var total_against = [];
var pwar_against = [];
var inner_against = [];
var disco_against = [];

var view_mode = "inner";

function preload(){
	data = loadTable('matches.csv', 'csv', 'header');
}
function setup(){
	createCanvas(1024, 768);

	total_pwar = data.getNum(10, 0) + data.getNum(10, 1);
	total_inner = data.getNum(10, 2) + data.getNum(10, 3);
	total_disco = data.getNum(10, 4) + data.getNum(10, 5);
	total_played = total_pwar + total_inner + total_disco;

	for(let i = 0; i < 10; i++){
		total_against[i] = 0;

		for(let k = 0; k < 6; k++){
			total_against[i] += data.getNum(i, k);
		}

		pwar_against[i] = data.getNum(i, 0) + data.getNum(i, 1);
		inner_against[i] = data.getNum(i, 2) + data.getNum(i, 3);
		disco_against[i] = data.getNum(i, 4) + data.getNum(i, 5);
	}
}

function draw(){
	background(0);
	textAlign(CENTER, CENTER);

	textSize(20);
	fill(255);
	if(view_mode == "all")
		text("PLAY FREQUENCY", width/2 + 300, height/2 + 200);
	else
		text("WINRATE", width/2 + 300, height/2 + 200);
	text("OPPOSE FREQUENCY", width/2 - 300, height/2 + 200);

	if(view_mode == "all"){
		fill(255);
		text("ALL DECKS", width/2, height/2 - 300);

		draw_comp_pie(width/2 + 300, height/2, 150, 
			[total_pwar, total_inner, total_disco], 
			[color(255, 0, 0), color(255), color(163, 48, 201)], total_played);

		draw_comp_pie(width/2 - 300, height/2, 150,
			total_against,
			[color(0, 255, 0), color(100, 67, 33), color(0, 120, 0), color(120, 120, 255), color(255, 255, 0), 
			color(255), color(100), color(0, 0, 120), color(163, 48, 201), color(255, 0, 0)], total_played);
	}
	else if(view_mode == "pwar"){
		fill(255);
		text("PIRATES", width/2, height/2 - 300);

		draw_comp_pie(width/2 + 300, height/2, 150, 
			[data.getNum(10, 0), data.getNum(10, 1)], 
			[color(0, 255, 0), color(255, 0, 0)], data.getNum(10, 0) + data.getNum(10, 1));

		draw_comp_pie(width/2 - 300, height/2, 150,
			pwar_against,
			[color(0, 255, 0), color(100, 67, 33), color(0, 120, 0), color(120, 120, 255), color(255, 255, 0), 
			color(255), color(100), color(0, 0, 120), color(163, 48, 201), color(255, 0, 0)], data.getNum(10, 0) + data.getNum(10, 1));
	}
	else if(view_mode == "inner"){
		fill(255);
		text("INNER FIRE", width/2, height/2 - 300);

		draw_comp_pie(width/2 + 300, height/2, 150, 
			[data.getNum(10, 2), data.getNum(10, 3)], 
			[color(0, 255, 0), color(255, 0, 0)], data.getNum(10, 2) + data.getNum(10, 3));

		draw_comp_pie(width/2 - 300, height/2, 150,
			inner_against,
			[color(0, 255, 0), color(100, 67, 33), color(0, 120, 0), color(120, 120, 255), color(255, 255, 0), 
			color(255), color(100), color(0, 0, 120), color(163, 48, 201), color(255, 0, 0)], data.getNum(10, 2) + data.getNum(10, 3));
	}
	else if(view_mode == "disco"){
		fill(255);
		text("DISCO", width/2, height/2 - 300);

		draw_comp_pie(width/2 + 300, height/2, 150, 
			[data.getNum(10, 4), data.getNum(10, 5)], 
			[color(0, 255, 0), color(255, 0, 0)], data.getNum(10, 4) + data.getNum(10, 5));

		draw_comp_pie(width/2 - 300, height/2, 150,
			disco_against,
			[color(0, 255, 0), color(100, 67, 33), color(0, 120, 0), color(120, 120, 255), color(255, 255, 0), 
			color(255), color(100), color(0, 0, 120), color(163, 48, 201), color(255, 0, 0)], data.getNum(10, 4) + data.getNum(10, 5));
	}
}

function draw_pie(xpos, ypos, start_deg, arc, r){
	beginShape();
	vertex(xpos, ypos);
	for(let i = start_deg; i < start_deg+arc % 360; i++){
		vertex(cos((i/180)*PI)*r + xpos, -sin((i/180)*PI)*r + ypos);
	}
	vertex(xpos, ypos);
	endShape();
}

function draw_comp_pie(xpos, ypos, r, values, colors, max){
	let arc_pos = 0;
	for(let i = 0; i < values.length; i++){
		let cur_arc = map(values[i], 0, max, 0, 360);

		fill(colors[i]);
		draw_pie(xpos, ypos, arc_pos, cur_arc, r);
		arc_pos += cur_arc;
	}
}

function keyPressed(){
	if(keyCode === LEFT_ARROW){
		switch(view_mode){
			case "all":
				view_mode = "disco";
				break;
			case "pwar":
				view_mode = "all";
				break;
			case "inner":
				view_mode = "pwar";
				break;
			case "disco":
				view_mode = "inner";
				break;
		}
	}

	if(keyCode === RIGHT_ARROW){
		switch(view_mode){
			case "all":
				view_mode = "pwar";
				break;
			case "pwar":
				view_mode = "inner";
				break;
			case "inner":
				view_mode = "disco";
				break;
			case "disco":
				view_mode = "all";
				break;
		}
	}
}













