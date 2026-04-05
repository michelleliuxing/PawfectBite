package com.pawfectbite.server.pets.controller;

import com.pawfectbite.server.common.response.ApiResponse;
import com.pawfectbite.server.infrastructure.security.AuthenticatedUser;
import com.pawfectbite.server.infrastructure.security.OwnershipEnforcer;
import com.pawfectbite.server.pets.application.PetService;
import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.pets.dto.CreatePetRequest;
import com.pawfectbite.server.pets.dto.PetResponse;
import com.pawfectbite.server.pets.dto.UpdatePetRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;
    private final OwnershipEnforcer ownershipEnforcer;

    public PetController(PetService petService, OwnershipEnforcer ownershipEnforcer) {
        this.petService = petService;
        this.ownershipEnforcer = ownershipEnforcer;
    }

    @GetMapping
    public ApiResponse<List<PetResponse>> listPets(@AuthenticationPrincipal AuthenticatedUser principal) {
        List<PetResponse> pets = petService.getPetsByUser(principal.userId()).stream()
                .map(PetResponse::from)
                .toList();
        return ApiResponse.ok(pets);
    }

    @GetMapping("/{petId}")
    public ApiResponse<PetResponse> getPet(
            @PathVariable UUID petId,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        Pet pet = petService.getPetById(petId);
        ownershipEnforcer.enforce(pet.userId());
        return ApiResponse.ok(PetResponse.from(pet));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<PetResponse> createPet(
            @Valid @RequestBody CreatePetRequest request,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        Pet pet = petService.createPet(principal.userId(), request);
        return ApiResponse.ok(PetResponse.from(pet));
    }

    @PutMapping("/{petId}")
    public ApiResponse<PetResponse> updatePet(
            @PathVariable UUID petId,
            @Valid @RequestBody UpdatePetRequest request,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        Pet existing = petService.getPetById(petId);
        ownershipEnforcer.enforce(existing.userId());
        Pet updated = petService.updatePet(petId, principal.userId(), request);
        return ApiResponse.ok(PetResponse.from(updated));
    }

    @DeleteMapping("/{petId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePet(
            @PathVariable UUID petId,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        Pet pet = petService.getPetById(petId);
        ownershipEnforcer.enforce(pet.userId());
        petService.deletePet(petId);
    }
}
