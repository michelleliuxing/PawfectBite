using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Pets.Queries;

public class GetPetDetails
{
    public class Query : IRequest<Pet>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Pet>
    {
        public async Task<Pet> Handle(Query request, CancellationToken cancellationToken)
        {
            var pet = await context.Pets.FindAsync([request.Id], cancellationToken);

            // Cannot use NotFound here, because it's not within an API controller context
            if (pet == null) throw new Exception("Pet not found");

            return pet;
        }
    }
}
