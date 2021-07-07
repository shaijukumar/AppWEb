using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppApi;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AppWebCustom;

namespace API.Controllers
{
    public class AppApiController : BaseController
    {

        // [HttpGet]
		// public async Task<ActionResult<List<AppApiDto>>> List()
        // {
        //     return await Mediator.Send(new List.Query());
        // } 

		[HttpGet("{id}")]
		public async Task<ActionResult<List<AppApiActionsDto>>>  ActionList(int id, int ItemId)
        {
            return await Mediator.Send(new ActionList.Query { FlowId = id, ItemId = ItemId });
        }
              
        [HttpPost("TakeAction")]
		public async Task<Dictionary<string, List<object>>> TakeAction([FromForm]ActionCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("Query")]
		public async Task<Dictionary<string, List<object>>> Query(ActionCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("Attachment")]
		public async Task<ActionResult> Attachment(DownloadAction.Command command)
        {
            return await Mediator.Send(command);
        }
 
        // [HttpPut("{id}")]
		// public async Task<ActionResult<AppApiDto>> Edit(Guid id, Edit.Command command)
        // {
        //     command.Id = id;
        //     return await Mediator.Send(command);
        // }

        // [HttpDelete("{id}")]
		// public async Task<ActionResult<Unit>> Delete(Guid id)
		// {
		// 	return await Mediator.Send(new Delete.Command { Id = id });
		// }
    }
}
