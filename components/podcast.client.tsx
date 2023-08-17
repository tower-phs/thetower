/** @format */

interface Props {
	link: string;
}

export default function Podcast({ link }: Props) {
	return (
		<iframe
			className="podcast"
			src={"https://player.rss.com/phstalks/" + link + "?theme=light"}
			title="rss embed thingy"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			width={"99%"}
		/>
	);
}
