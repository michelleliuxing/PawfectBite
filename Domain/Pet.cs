using System;
using System.Security.Cryptography;

namespace Domain;

public class Pet
{
    public string Id { get; set; }= Guid.NewGuid().ToString(); // Create new GUID for new Pet
    public required string Name { get; set; }
    public required string Type { get; set; } // "dog" or "cat"
    public required string Breed { get; set; }
    public required double Age { get; set; } // in years
    public required double Weight { get; set; } // in kg
    public required string ActivityLevel { get; set; } // "low", "moderate", "high"
    public string HealthIssues { get; set; } = "None";
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsDesexed { get; set; }
}
