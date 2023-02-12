function YoutubeFrame(props) {
  const embedUrl = "https://www.youtube.com/embed";
  return (
    <div className="mt-1 text-center youtube-container">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        frameborder="0"
        src={`${embedUrl}/${props.url}?&autoplay=${props.autoplay}&enablejsapi=1&showinfo=0`}
        style={{ borderRadius: 10 }}
        title={props.title}
      ></iframe>
    </div>
  );
}

export default YoutubeFrame;
