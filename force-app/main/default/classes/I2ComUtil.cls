/**
 * Created by 곽태정 on 2021-07-30.
 */

public class I2ComUtil {

    /**
     * 선택목록 반환
     *
     * @param obj   : String
     * @param field : String
     *
     * @return  List<Schema.PicklistEntry>
     */
    public static List<Schema.PicklistEntry> getPickList(final String obj, final String field){
        return (((SObject)(Type.forName('Schema.'+obj).newInstance())).getSObjectType())
                .getDescribe().fields.getMap().get(field).getDescribe().getPicklistValues();
    }

    /**
     * Sobject의 Field 를 이용한 Select Options 생성
     *
     * @param obj   : String
     * @param field : String
     *
     * @return  List<I2ComClass.Option>
     */
    public static List<I2ComClass.Option> makePickListOptions(final String obj, final String field){
        return makePickListOptions(obj, field, false);
    }

    /**
     * Sobject의 Field 를 이용한 Select Options 생성
     *
     * @param obj       : String
     * @param field     : String
     * @param notBlank  : Boolean
     *
     * @return  List<I2ComClass.Option>
     */
    public static List<I2ComClass.Option> makePickListOptions(final String obj, final String field, final Boolean notBlank){
        return makePickListOptions(obj, field, notBlank, false);
    }

    /**
     * Sobject의 Field 를 이용한 Select Options 생성
     *
     * @param obj           : String
     * @param field         : String
     * @param notBlank      : Boolean
     * @param isSelectAll   : Boolean
     *
     * @return  List<I2ComClass.Option>
     */
    public static List<I2ComClass.Option> makePickListOptions(final String obj, final String field, final Boolean notBlank, final Boolean isSelectAll){
        return   makePickListOptions(obj, field, notBlank, isSelectAll, null);
    }

    /**
     * Sobject의 Field 를 이용한 Select Options 생성
     *
     * @param obj           : String
     * @param field         : String
     * @param notBlank      : Boolean
     * @param isSelectAll   : Boolean
     * @param excludes      : Set<String>
     *
     * @return  List<I2ComClass.Option>
     */
    public static List<I2ComClass.Option> makePickListOptions(final String obj, final String field, final Boolean notBlank, final Boolean isSelectAll, final Set<String> excludes){
        List<I2ComClass.Option> tmpList = makeInitOptions( (isSelectAll ? '--All--' : null), notBlank);
        for(Schema.PicklistEntry pick : getPickList(obj, field)) {
            if(excludes == null) {
                tmpList.add(new I2ComClass.Option(pick.getLabel(), pick.getValue()));
            }
            else {
                if(excludes.contains(pick.getValue()) == false) {
                    tmpList.add(new I2ComClass.Option(pick.getLabel(), pick.getValue()));
                }
            }
        }
        return tmpList;
    }

    /**
     * Select Option의 기본값을 세팅하여 리턴
     *
     * @param selectAllComment : String
     *
     * @return  List<I2ComClass.Option>
     */
    public static List<I2ComClass.Option> makeInitOptions(final String selectAllComment){
        return makeInitOptions(selectAllComment, false);
    }

    /**
     * Select Option의 기본값을 세팅하여 리턴
     *
     * @param selectAllComment  : String
     * @param notBlank          : Boolean
     *
     * @return  List<I2ComClass.Option>
     */
    public static List<I2ComClass.Option> makeInitOptions(final String selectAllComment, final Boolean notBlank){
        List<I2ComClass.Option> tmpOptions = new List<I2ComClass.Option>();
        if(notBlank == false) {
            tmpOptions.add(new I2ComClass.Option(String.isNotBlank(selectAllComment) ? selectAllComment : '--None--', ''));
        }
        return tmpOptions;
    }
}