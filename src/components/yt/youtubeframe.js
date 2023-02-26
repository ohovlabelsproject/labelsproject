function YoutubeFrame(props) {
  const embedUrl = "https://www.youtube.com/embed";
  return (
    <div className="mt-3 text-center youtube-container">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
        frameborder="0"
        src={`${embedUrl}/${props.url}?&autoplay=${props.autoplay}&showinfo=0&rel=0&cc_load_policy=1`}
        style={{ borderRadius: 10 }}
        title={props.title}
      ></iframe>
    </div>
  );
}

export default YoutubeFrame;
