namespace Application.AppEngine
{
    public class AppApiOperations
    {
        public static string GetOperator(string strOpr)
        {
            string opr = string.Empty;

            # region Operation type
            
            switch (strOpr.ToLower())
            {
                case "eq":
                    opr = "=";
                    break;
                case "ne":
                    opr = "!=";
                    break;
                case "lt":
                    opr = ">";
                    break;
                case "le":
                    opr = ">=";
                    break;
                case "gt":
                    opr = "<";
                    break;
                case "ge":
                    opr = ">=";
                    break;
                default:
                    opr = "=";
                    break;
            }

            # endregion Operation type
           
            return opr;
        }
    }
} 