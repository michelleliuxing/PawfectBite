using System;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

// route prefix is api/pets because the controller is named PetsController.
public class PetsController: BaseApiController
{
    private readonly AppDbContext _context;

    public PetsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Pet>>> GetPets()
    {
        var pets = await _context.Pets.ToListAsync();
        return Ok(pets);
    } 

    [HttpGet("{id}")]
    public async Task<ActionResult<Pet>> GetPetDetails(string id)
    {
        var pet = await _context.Pets.FindAsync(id);
        
        if (pet == null)
            return NotFound($"Pet with ID {id} not found");
            
        return Ok(pet);
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreatePet(Pet pet)
    {
        // Generate new ID if not provided
        if (string.IsNullOrEmpty(pet.Id))
            pet.Id = Guid.NewGuid().ToString();

        _context.Pets.Add(pet);
        await _context.SaveChangesAsync();
        
        return Ok(pet.Id);
    }

    [HttpPut]
    public async Task<ActionResult> EditPet(Pet pet)
    {
        var existingPet = await _context.Pets.FindAsync(pet.Id);
        
        if (existingPet == null)
            return NotFound($"Pet with ID {pet.Id} not found");

        // Update properties
        existingPet.Name = pet.Name;
        existingPet.Type = pet.Type;
        existingPet.Breed = pet.Breed;
        existingPet.Age = pet.Age;
        existingPet.Weight = pet.Weight;
        existingPet.ActivityLevel = pet.ActivityLevel;
        existingPet.HealthIssues = pet.HealthIssues;
        existingPet.ImageUrl = pet.ImageUrl;
        existingPet.IsDesexed = pet.IsDesexed;

        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePet(string id)
    {
        var pet = await _context.Pets.FindAsync(id);
        
        if (pet == null)
            return NotFound($"Pet with ID {id} not found");

        _context.Pets.Remove(pet);
        await _context.SaveChangesAsync();
        
        return Ok();
    }
}
