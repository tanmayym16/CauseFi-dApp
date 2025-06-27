// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint[]) public donatedCampaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        donatedCampaigns[msg.sender].push(_id);

        (bool sent,) = payable(campaign.owner).call{value: msg.value}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + msg.value;
        }
    }

    function getDonatedCampaigns() public view returns (Campaign[] memory) {
        uint[] memory campaignIds = donatedCampaigns[msg.sender];
        Campaign[] memory userDonatedCampaigns = new Campaign[](campaignIds.length);

        for(uint i = 0; i < campaignIds.length; i++) {
            userDonatedCampaigns[i] = campaigns[campaignIds[i]];
        }

        return userDonatedCampaigns;
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getCampaign(uint256 _id) public view returns (address, string memory, string memory, uint256, uint256, uint256, string memory) {
        Campaign storage campaign = campaigns[_id];
        return (
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.image
        );
    }

    function getCampaignsByOwner(address _owner) public view returns (Campaign[] memory) {
        uint256 ownerCampaignCount = 0;
        for (uint i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == _owner) {
                ownerCampaignCount++;
            }
        }

        Campaign[] memory ownerCampaigns = new Campaign[](ownerCampaignCount);
        uint256 currentItemIndex = 0;

        for (uint i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == _owner) {
                Campaign storage item = campaigns[i];
                ownerCampaigns[currentItemIndex] = item;
                currentItemIndex++;
            }
        }
        return ownerCampaigns;
    }
}

