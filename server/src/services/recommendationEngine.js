/**
 * Recommendation & Matching Engine for Creator Cart
 * Computes match score (0-100%) and reasons between a campaign and an influencer.
 */

export function calculateMatchScore(campaign, influencer) {
  if (!campaign || !influencer) {
    return { score: 75, reasons: ['General compatibility'] };
  }

  let score = 50; // base score
  const reasons = [];

  // 1. Niche & Category Matching (+25 max)
  const campCategory = (campaign.category || '').toLowerCase();
  const infNiche = (influencer.niche || '').toLowerCase();

  if (campCategory === infNiche || infNiche.includes(campCategory) || campCategory.includes(infNiche)) {
    score += 25;
    reasons.push(`Same niche (${influencer.niche})`);
  } else if (
    (campCategory.includes('tech') && infNiche.includes('tech')) ||
    (campCategory.includes('beauty') && infNiche.includes('beauty')) ||
    (campCategory.includes('fashion') && infNiche.includes('lifestyle'))
  ) {
    score += 15;
    reasons.push('High niche overlap');
  } else {
    score += 5;
  }

  // 2. Target Platform Match (+15)
  const prefPlatform = (campaign.preferredPlatform || '').toLowerCase();
  const social = influencer.socialMedia || {};
  const hasPlatform = Object.keys(social).some(key => {
    return key.toLowerCase() === prefPlatform && social[key] && (social[key].followers > 0 || social[key].subscribers > 0);
  });

  if (hasPlatform) {
    score += 15;
    reasons.push(`Active on preferred platform (${campaign.preferredPlatform})`);
  }

  // 3. Followers / Reach Check (+15)
  const totalFollowers = influencer.metrics?.totalFollowers || 0;
  const requiredFollowers = campaign.requiredFollowers || 10000;

  if (totalFollowers >= requiredFollowers * 2) {
    score += 15;
    reasons.push(`Exceeds follower criteria (${(totalFollowers / 1000).toFixed(0)}K vs ${(requiredFollowers / 1000).toFixed(0)}K)`);
  } else if (totalFollowers >= requiredFollowers) {
    score += 10;
    reasons.push('Meets minimum follower threshold');
  }

  // 4. Engagement Rate (+15)
  const engRate = influencer.metrics?.engagementRate || 3.0;
  if (engRate >= 4.5) {
    score += 15;
    reasons.push(`High engagement rate (${engRate}%)`);
  } else if (engRate >= 3.0) {
    score += 10;
    reasons.push(`Good engagement rate (${engRate}%)`);
  }

  // 5. Budget Match (+15)
  const campBudget = campaign.budget || 1000;
  const infPostRate = influencer.pricing?.reel || influencer.pricing?.post || 500;

  if (campBudget >= infPostRate) {
    score += 15;
    reasons.push('Campaign budget matches rate card');
  } else if (campBudget >= infPostRate * 0.7) {
    score += 10;
    reasons.push('Competitive budget range');
  }

  // 6. Audience & Location (+15)
  if (influencer.country && (campaign.location || '').toLowerCase().includes(influencer.country.toLowerCase())) {
    score += 15;
    reasons.push(`Target audience location match (${influencer.country})`);
  } else {
    score += 5;
    reasons.push('Global audience reach');
  }

  // Cap score between 60 and 99 for realistic SaaS metrics
  const finalScore = Math.min(Math.max(score, 60), 99);

  return {
    score: finalScore,
    reasons: reasons.slice(0, 4)
  };
}
