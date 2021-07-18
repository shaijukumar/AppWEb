using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application._AppApi;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AppWebCustom;
using Application.User;
using Application._AppNavigation;
using Application._AppStatusList;
using Application._AppConfig;
using Application._AppUserRoleMaster;

namespace API.Controllers
{
    public class AppApiController : BaseController
    {

        // [HttpGet]
		// public async Task<ActionResult<List<AppApiDto>>> List()
        // {
        //     return await Mediator.Send(new List.Query());
        // } 
       
        [HttpGet("{id}", Name = "UserList")]
        [Route("UserList")]
		public async Task<ActionResult<List<UserDTO>>>  UserList( string Type = null, string Value = null)
        {
            return await Mediator.Send(new AppApiUser.Query { Type = Type, Value = Value});
        }

		//[HttpGet("{id}")]
        [HttpGet("{id}", Name = "ActionList")]
        [Route("[action]/{id}")]
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

        [HttpGet("{id}", Name = "GetStatusList")]
        [Route("GetStatusList/{id}")]
		public async Task<ActionResult<List<AppStatusListDto>>>  GetStatusList(int id)
        {
            return await Mediator.Send(new DataStatusList.Query{Id = id} );
        }

        [HttpGet("{id}", Name = "GetConfigList")]
        [Route("GetConfigList/{id}")]
		public async Task<ActionResult<List<AppConfigDto>>>  GetConfigList(int id)
        {
            return await Mediator.Send(new DataConfigList.Query{Id = id} );
        }

        [HttpGet(Name = "GetRoleList")]
        [Route("GetRoleList")]
		public async Task<ActionResult<List<AppUserRoleMasterDto>>>  GetRoleList()
        {
            return await Mediator.Send(new GetRoleList.Query() );
        }

        [HttpGet(Name = "GetUserList")]
        [Route("GetUserList")]
		public async Task<ActionResult<List<UserDTO>>>  GetUserList()
        {
            return await Mediator.Send(new GetUserList.Query() );
        }

        [HttpGet]
        [Route("NavigationList")]
		public async Task<ActionResult<List<AppNavigationDto>>>  NavigationList()
        {
            return await Mediator.Send(new NavigationList.Query());
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
