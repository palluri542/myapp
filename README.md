# myapp

------------------------------------Aug 31st---------------------------------------------
// Aug 31st

Updated clientlist json file format

{
    "clientID": 1,
    "clientName": "Quantitative Investment Management (QIM)",
    "clientState": "OK",
    "latestIncompleteDate": "11-12-2015"
},
{
    "clientID": 2,
    "clientName": "Banco Inbursa",
    "clientState": "OF",
    "latestIncompleteDate": "11-13-2015"
},


// when radio button open is selected, all the clients with "latestIncompleteDate" for the last 'x' days has to be filtered.
// 'x' is user changable

-----------------------------------------Aug 31st-----------------------------------------------


Scotts Email

So I'll send you a list of clientDetail objects:

clientId,
clientName,
One of the four strings in double quotes below. (OK,OF….),


public enum ClientState {

    OK("OK"), 
    OUTSTANDING_FILES("OF"),
    FILE_ERROR("FE"),
    FILE_ERROR_WITH_OUTSTANDING_FILES("EO");

--------------------------------Aug 27--------------------------------------

---one---


REST Calls

@POST
@Path("/systemProfile")
    public SystemUserProfile systemProfile(SystemProfileRequest req)
    
    
    
    /*****************************************
    Node installation 
    insatll node.exe  
    navigate to project folder by command prompt 
     enter npm init 
     
     npm install express
     node server 
     goto browser and type localhost:8000
     
    
    and 
    
    
    
    
    

@POST
    @Path("/profile")
    public  UserProfile userProfile(String userId) 


A UserProfile is basically a lsit of SystemProfiles. Each SystemProfile has a list of profileItems (font=12;  currentDays=5; etc…..)


public class UserProfile {
    String userId;
    String displayName;
    List<SystemUserProfile> systems;
}

public class SystemUserProfile {
    public String systemId;
    public String displayName;
    public String userId;
    public String userDisplayName;
    public List<UserProfileItem> items;
}

public class UserProfileItem {
    protected String userID;
    protected String systemId;
    protected String name;
    protected String value;
    protected String priorValue;
    protected String lastUpdatedBy;
    protected boolean updateable;
}



---Two---

URL:  apiSdma/clientList

@GET
@Produces(MediaType.APPLICATION_JSON)

public class ClientList implements Serializable{
    protected Set<ClientListDetail> clients;
}

public class ClientListDetail implements Serializable{
    protected Integer clientOid;
    protected String clientName;
    protected String clientState;  //OK, OF etc
    protected Date   latestIncompleteDate;
}


---Three---

For the notes:

    @POST
    @Path("/addNote")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addNote(FileNote note)

  @POST
    @Path("/notesForFile")
    public FileNotes notesForFile(FileRequest req) {
        return DummyData.getFileNotes();
    }


public class FileRequest {                (This will be used for various requests)
    public String clientId;
    public Set<String> fileNames;    (For a notes req there would only be one file in the set)
    public Date fromDate;
    public Date toDate;
}


public class FileNotes {
    protected String clientId;
    protected String fileName;
    protected List<FileNote> notes;
}

public class FileNote {
    Integer clientId;
   String clientName;    
   String fname;  
  Date forTrdDate;
  String createdBy;
  Date createdOn;
  String note;
}


---Four---

These should give you a big hunk of the API.  Please mark down any inconsistencies , thing that are missing, things that are wrong etc.



@POST
@Path("/fileStatus")
    public List<FileSummary>  fileStatus(FileRequest req)


@POST
    @Path("/clientFiles")
    
    public ClientFileList  clientFiles(FileRequest req) {
        return new ClientFileList();
    }



public class FileRequest {                                              <--- For UI requests
    public String clientId;
    public Set<String> fileNames;
    public Date fromDate;
    public Date toDate;
}

public class ClientFileList {                                                             <<---- To be used for the bottom of the center panel

    public String clientId;
    public Set<FileSummary> files;
     
}

public class FileSummary implements Serializable {                <<---- To be used for the bottom of the center panel

    protected Integer clientId;
    protected String fileName;
    protected Date receivedTime;
    protected Date processedTime;
}


public class FileState implements Serializable{   {                <<---- To be used for the top of the center panel
    protected Integer clientId;
    protected String clientName;
    protected String fileName;
    protected String currentStatus;
    protected int recordCount;
    protected Date receivedTime;
    protected String replacedBy;
    protected List<FileError> errors;
}

public class FileError {
    protected int recordNumber;
    protected String errorMessage;
    protected String theRecord;
    protected String validator;
    protected String response;
}


---Five----

You can take off the "FTP Hosts" and "Exchanges" buttons for now. 

We will need adialog for some general clint info (name,a ddress, etc).

Then each client will have 0..n FtpInstance objects.

So maybe a master / detail dialog ?  Whatever you think makes the most sense.

public class ClientFtpInstance {
    protected Integer clientId; 
    protected String clientName;
    protected String server;
    protected String dirPath;
    protected Integer expFileCnt;
    protected Date expStartTime;
    protected Date expEndTime;
    protected Integer interval;
    protected String intTF;
    protected String defaultParser;
    protected String ftpId;
    protected String ftpPw;
}


--------------------------------------------------------------------------------------------------------------------------
