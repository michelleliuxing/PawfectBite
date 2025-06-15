using System;
using Domain;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (context.Pets.Any()) return; 

        // // Remove all existing pets
        // context.Pets.RemoveRange(context.Pets);
        // await context.SaveChangesAsync();

        var pets = new List<Pet>
        {
            new() {
                Name = "Max",
                Type = "dog",
                Breed = "Labrador Retriever",
                Age = 3,
                Weight = 30.5,
                ActivityLevel = "high",
                HealthIssues = "None",
                ImageUrl = "/pets/labrador.png",
                IsDesexed = true
            },
            new() {
                Name = "Bella",
                Type = "dog",
                Breed = "German Shepherd",
                Age = 2,
                Weight = 28.0,
                ActivityLevel = "moderate",
                HealthIssues = "Hip dysplasia",
                ImageUrl = "/pets/germanshepherd.png",
                IsDesexed = true
            },
            new() {
                Name = "Mimi",
                Type = "cat",
                Breed = "Siamese",
                Age = 4,
                Weight = 4.2,
                ActivityLevel = "low",
                HealthIssues = "None",
                ImageUrl = "/pets/siamese.png",
                IsDesexed = true
            },
            new() {
                Name = "Fifi",
                Type = "cat",
                Breed = "Tabby",
                Age = 1,
                Weight = 3.8,
                ActivityLevel = "moderate",
                HealthIssues = "Allergies",
                ImageUrl = "/pets/tabby.png",
                IsDesexed = false
            },
            new() {
                Name = "Charlie",
                Type = "dog",
                Breed = "Beagle",
                Age = 5,
                Weight = 12.0,
                ActivityLevel = "high",
                HealthIssues = "Ear infections",
                ImageUrl = "/pets/beagle.png",
                IsDesexed = true
            }
        };

        context.Pets.AddRange(pets); // Entity Framework racking updates in memeory
        await context.SaveChangesAsync(); // Add data to database
    }
}
