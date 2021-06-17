using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppColumnMaster;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppColumnMasterController : BaseController
    {

        [HttpGet]
		public async Task<ActionResult<List<AppColumnMasterDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}", Name = "ColumnList")]
        [Route("ColumnList/{id}")]
		public async Task<ActionResult<List<AppColumnMasterDto>>> List(int id)
        {
            //return await Mediator.Send(new ColumnList.Query());
            return await Mediator.Send(new ColumnList.Query { Id = id });
        }

		[HttpGet("{id}")]
        [Route("[action]/{id}")]
		public async Task<ActionResult<AppColumnMasterDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }


        [HttpPost]
		public async Task<ActionResult<AppColumnMasterDto>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
		public async Task<ActionResult<AppColumnMasterDto>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
		public async Task<ActionResult<Unit>> Delete(int id)
		{
			return await Mediator.Send(new Delete.Command { Id = id });
		}
    }
}
