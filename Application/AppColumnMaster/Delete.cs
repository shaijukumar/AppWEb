using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application._AppColumnMaster
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var appColumnMaster = await _context.AppColumnMasters
                    .FindAsync(request.Id);
                if (appColumnMaster == null)
                    throw new RestException(HttpStatusCode.NotFound, new { AppColumnMaster = "Not found" });

                string SqlWhere = $" TableId = {appColumnMaster.TableID} ";
                if(appColumnMaster.Type ==  "1" ){
                    SqlWhere += $" and {appColumnMaster.AppDataFiled}  is NOT NULL";
                }
                else if(appColumnMaster.Type ==  "5" ){
                    SqlWhere += $" and {appColumnMaster.AppDataFiled}  != '0001-01-01 00:00:00' ";
                }
                else{
                    SqlWhere += $" and {appColumnMaster.AppDataFiled}  != 0";
                }

                bool appDataExists = await _context.AppDatas
                .FromSqlRaw( "SELECT * FROM AppDatas WHERE " + SqlWhere )
                .AnyAsync();

                if(appDataExists){
                     throw new RestException(HttpStatusCode.OK, new { Error = $"Data exists for this table." });
                }                

                var CurrentUsername = _userAccessor.GetCurrentUsername();

                _context.Remove(appColumnMaster);
				//var success = await _context.SaveChangesAsync() > 0;
				//if (success) return Unit.Value;

                try{
                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) 
                        return  Unit.Value;
                    else    
                        throw new RestException(HttpStatusCode.OK, new { Error = $"No dows deleted." });
                } 
                catch(Exception ex){
                    throw new RestException(HttpStatusCode.OK, new { Error = $"Problem on deletion. {ex.Message}. {ex.InnerException.Message}." });
                } 

                throw new Exception("Problem saving changes");

            }

        }

    }
}
