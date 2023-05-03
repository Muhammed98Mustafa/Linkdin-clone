import React from "react";
import ReactPlayer from "react-player";

export const mainarticles = ({ articles }) => {

  return (
    <div className="">
      {articles.length === 0 && <p className="mx-auto text-center text-4xl  font-bold lg:mt-24 mt-12 " > ...no articles yet </p>}

      {articles?.map((article , index) => {
        return (
          <div key={index} className="bg-white  rounded-md lg:mt-8 my-4 pt-4 border-2 border-slate-200">
            <div className="flex flex-row justify-between items-start pl-4">
              <div className="flex flex-row gap-2 ">
                <div className="w-12 h-12  ">
                  <img
                    src={article.actor.image}
                    alt="usernamephoto"
                    className="rounded-full"
                  />
                </div>
                <div className="item">
                  <p className="font-bold"> {article.actor.title} </p>
                  <p className="text-sm text-slate-500">
                    {" "}
                    {article.actor.description}{" "}
                  </p>
                  <p className="text-sm text-slate-500">
                    {" "}
                     {article.actor.date.toDate().toLocaleString()}{" "}
                  </p>
                </div>
              </div>
              <button type="button" className="mr-2" >
                <img src="/images/ellipsis.svg" alt="" />
              </button>
            </div>
            <body > 
              <p className="lg:ml-6 ml-4 mt-8 mb-2"> {article.description} </p>
              {
                article.video !== "" && ( <ReactPlayer url={article.video} controls width="100%" />)
              }
               {
                article.shareImg !== "" && ( <img src={article.shareImg} alt="imageofpost" className="w-full h-full object-contain	" />)
              }
             <div> 
             <button className="flex flex -row mt-8 ml-4">
                      <img
                        src="https://static-exp1.licdn.com/sc/h/2uxqgankkcxm505qn812vqyss"
                        alt=""
                      />
                      <img
                        src="https://static-exp1.licdn.com/sc/h/f58e354mjsjpdd67eq51cuh49"
                        alt=""
                      />
                      <span>75</span>
                    </button>

             </div>
             <hr/>
             <div className="flex flex-row flex gap-8 ">
          <button className=" flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4 lg:ml-2">
          <img src="/images/like-icon.svg" alt="" />
                    <span>Like</span>
          </button>
          <button className="flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4">
          <img src="/images/comment-icon.svg" alt="" />
                    <span>Comment</span>
          </button>
          <button className="flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4">
          <img src="/images/share-icon.svg" alt="" />
                    <span>Share</span>
          </button>
          <button className="flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4 lg:mr-2">
          <img src="/images/send-icon.svg" alt="" />
                    <span>Send</span>
          </button>
        </div>
            </body>
          </div>
        );
      })}
    </div>
  );
};
export default mainarticles;
