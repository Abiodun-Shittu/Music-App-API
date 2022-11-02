import mongoose from "mongoose";

const { Schema } = mongoose;

const musicSchema = new Schema({
	song: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
	album: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: [
			"POP",
			"African",
			"R&B",
			"Worldwide",
			"Rock",
			"Hits",
			"Party",
			"Dj Mixes",
			"Country",
			"Hip Hop",
			"Recently Added",
		],
		default: "Recently Added",
	},
	imageUrl: String,
	playCount: {
		type: Number,
		default: 0,
	},
});

export default mongoose.model("music", musicSchema);
