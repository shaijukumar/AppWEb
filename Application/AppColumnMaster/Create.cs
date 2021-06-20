using System;
using System.Threading;
using FluentValidation;
using MediatR;
using System.Threading.Tasks;
using AutoMapper;
using Persistence;
using Application.Interfaces;
using Domain;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application._AppColumnMaster
{
    public class Create
    {
        public class Command : IRequest<AppColumnMasterDto>
        {

            public int TableID { get; set; }
            public string Title { get; set; }
            public string Type { get; set; }
            public string UserAccess { get; set; }
            public int ConfigId { get; set; }	
		    public int AttachmentConfig { get; set; }	
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.TableID).NotEmpty();
				RuleFor(x => x.Title).NotEmpty();
				RuleFor(x => x.Type).NotEmpty();
				RuleFor(x => x.UserAccess).NotEmpty();
				
            }
        }

        public class Handler : IRequestHandler<Command, AppColumnMasterDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;

            }

            public async Task<AppColumnMasterDto> Handle(Command request, CancellationToken cancellationToken)
            {                       
                int colCount = 0;
                string colText = string.Empty;                
                switch(request.Type){
                    case "1"://Txt
                        colCount = 25;
                        colText = "Txt";
                        break; 
                    case "2"://Num
                        colCount = 10;
                        colText = "Num";
                        break;
                    case "3"://Float
                        colCount = 10;
                        colText = "Float";
                        break;
                    case "4"://Bool
                        colCount = 10;
                        colText = "Bool";
                        break;
                    case "5": //DateTime
                        colCount =15;
                        colText = "DateTime";
                        break;
                    case "6": //Config
                        colCount =10;
                        colText = "Config";
                        break;
                    case "7": //DateTime
                        colCount =5;
                        colText = "Attachment";
                        break;
                }

                //Get all columns used
                var colList = await _context.AppColumnMasters
                    .Where(x => x.TableID == request.TableID && x.Type == request.Type ).ToListAsync();

                //get new column
                string newColText = string.Empty;
                for(int ci = 1;ci<=colCount;ci++){
                    var col = colList.Find( x => x.AppDataFiled == colText + ci.ToString() );
                    if(col == null){
                        newColText = colText + ci.ToString();
                        break;
                    }
                }
                
                if( string.IsNullOrEmpty(newColText) ){
                    throw new Exception("Column limit exceed of type " + colText);
                }

                var appColumnMaster = new AppColumnMaster
                {
					TableID  = request.TableID,
					Title  = request.Title,
					Type  = request.Type,
					UserAccess  = request.UserAccess,
                    AppDataFiled = newColText,
                    ConfigId  = request.ConfigId,
                    AttachmentConfig = request.AttachmentConfig                 
                };

                _context.AppColumnMasters.Add(appColumnMaster);
                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    var toReturn = _mapper.Map <AppColumnMaster, AppColumnMasterDto>(appColumnMaster);
                    return toReturn;
                }                

                throw new Exception("Problem saving changes");
}
        }
    }
}
