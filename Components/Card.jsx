import React from "react";

const Card = ({
  title,
  amountCollected,
  target,
  deadline,
  image,
  category,
  handleClick,
  owner,
  description,
}) => {
  // Detect demo campaign by owner address
  const isDemo = owner && owner.startsWith && owner.startsWith("0xDEMO");

  const daysLeft = (deadline) => {
    if (isDemo) return "Currently Available";
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    if (remainingDays <= 0) {
      return "Expired";
    }
    const days = remainingDays.toFixed(0);
    return `${days} day${days === "1" ? "" : "s"} left`;
  };

  // Demo progress: if demo, use a random or fixed value for progress and raised
  let progress, displayAmountCollected;
  if (isDemo) {
    // For demo, show a random progress between 20% and 80%
    progress = Math.floor(20 + Math.random() * 60);
    displayAmountCollected = `${((progress / 100) * parseFloat(target)).toFixed(2)} ETH`;
  } else {
    progress = target && parseFloat(target) > 0
      ? Math.min((parseFloat(amountCollected) / parseFloat(target)) * 100, 100)
      : 0;
    displayAmountCollected = `${amountCollected} ETH Raised`;
  }

  // Demo stories (map by title or pId for more variety)
  const demoStories = {
    "Solar Village Project – Lighting Lives with the Power of the Sun": "This project brought light to a remote village in Rajasthan, empowering women, children, and local businesses with clean solar energy.",
    "Clean Water for All: Borewell Initiative": "Over 2,000 families now have access to safe, sustainable water thanks to new borewells and local training.",
    "Girls Code: Rural Tech Bootcamp": "30 girls in rural Nepal learned to code and gained digital literacy, opening doors to new opportunities.",
    "Art for Change: Community Mural Festival": "Ten large-scale murals now brighten São Paulo, celebrating diversity and community spirit.",
    "Tech for Good: Laptops for Students": "Refurbished laptops helped underprivileged students continue their education online.",
    "Community Art Project: Mural Painting": "A neighborhood was transformed with a vibrant mural, bringing people together through art.",
    "Eco-Friendly Initiative: Urban Garden": "A new urban garden now provides fresh produce and promotes sustainability in the community.",
  };

  const story = isDemo ? demoStories[title] || "This is a demo campaign story." : "";

  return (
    <div
      className="flex flex-col gap-3 pb-3 cursor-pointer bg-[#1c1c24] rounded-xl transition-transform duration-200 shadow-md hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8c6dfd]"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for campaign: ${title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl relative"
        style={{ backgroundImage: `url(${image})` }}
        aria-label={title}
        role="img"
      >
        <span className="absolute top-3 left-3 bg-[#8c6dfd] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {category || "General"}
        </span>
      </div>
      <div className="px-2">
        <p className="text-white text-base font-medium leading-normal truncate">
          {title}
        </p>
        <div className="w-full h-2 bg-[#2f273a] rounded-full my-2">
          <div
            className="h-2 bg-[#4acd8d] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label={`Progress: ${progress.toFixed(0)}%`}
          ></div>
        </div>
        <div className="flex justify-between items-center text-xs mt-1">
          <span className="text-[#a99abc] font-semibold">
            {isDemo ? displayAmountCollected + " Raised" : displayAmountCollected}
          </span>
          <span className="text-[#a99abc]">
            {daysLeft(deadline)}
          </span>
        </div>
        {/* Story Section */}
        {story && (
          <div className="mt-3 bg-[#23232d] rounded p-2 text-xs text-[#a99abc]">
            <span className="font-semibold text-white">Story: </span>{story}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
