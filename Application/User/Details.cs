using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Details
    {
        public class Query : IRequest<UserDTO>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
               _context = context;
            }

            public async Task<UserDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var user = await _context.Users.FirstOrDefaultAsync( u => u.UserName == request.Username  );   
                       
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not Found" });

                var toReturn = _mapper.Map <AppUser, UserDTO>(user); 
                return toReturn;
            }
        }
    }
}