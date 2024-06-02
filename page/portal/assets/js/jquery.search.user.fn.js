if (jQuery) (function($) {

    /*
     * $('#searchCategoryNo').searchCategory(divisionCd);
     */
    $.fn.searchCategory = function (divisionCd, depth, field) {
        var self = this;
        var id = this.attr('id');
        var title = [];
        if (this.attr('title') != null) { 
            title = this.attr('title').split(',');
        }
        var value = $(this).val();
        var fid = '';
        

        if (field == undefined) field = '';
        if (value == undefined) value = '';
        if (value != '' && value != '-1' ) {
            var data = $.getAjaxAsync({
                commandUrl  : BASE_ROOT + '/user/search/SearchCategoryPath.do',
                commandData : 'divCd='+ divisionCd +'&categoryNo='+ value
            });
            if (data != null) { 
                value = data.ctgryPath;
            }
        }
        var val = value.split('/');
        
        for (var i = 1; i <= depth ; i++) { 
            fid = id +'-'+ i;
            $('#'+ fid).remove();
            $(self).before('<select id="'+ fid +'" name="'+ fid +'" title="'+ (title[i -1] != null ? title[i-1] : '분류 '+ i) +'"><option value="">'+ (title[i -1] != null ? title[i-1] : '분류 '+ i) +'</select>');
            
            if (i != 1) { 
                field += (field == '' ? '' : ',') + '#'+ id + '-'+ (i - 1);
            }
            if (field == '') {
                $('#'+ fid).searchSelect(BASE_ROOT + '/user/search/SearchCtgryList.do?divCd='+ divisionCd +'&ctgryDepth='+i, val[i]);
            }
            else { 
                $('#'+ fid).searchChained(field, BASE_ROOT + '/user/search/SearchCtgryList.do?divCd='+ divisionCd +'&ctgryDepth='+ i +'&field='+ id + '-' + (i - 1), val[i]);
            }
        }
        
        //$('select[id^='+ id +']').selectmenu();
        $('select[id^='+ id +']').on('change selectmenuchange',  function () {
            if (this.value != '') { 
                $(self).val(this.value);
            }
            else {
                var prevValue = '';
                $('select[id^='+ id +']').each(function (index) {
                    if (this.value == '') {
                        $(self).val(prevValue);
                        return false;
                    }
                    prevValue = this.value;
                });
            }
            $(self).trigger('change');
        });
        
        if(depth > 1  && divisionCd == 'CRSE'){
            $('#'+id).searchCrseCategory($("#"+id+"1").val(),$("#"+id+"2").val()); 
            $("#"+id+"-1").change(function(){
                $('#'+id).searchCrseCategory($("#"+id+"-1").val()); 
            });
        }
    };
    
    
    $.fn.searchCrseCategory = function (val,selectvalue) {
        fid = "searchCtgryCd-2";
        $('#searchCtgryCd-2').parent().remove();
        $('#searchCtgryCd').before('<select id="'+ fid +'" name="'+ fid +'" title="과정 중분류"><option value="">과정 중분류</select>');
        
        if(val!="" && val!=null){
            $('#'+ fid).searchSelect(BASE_ROOT + '/user/search/SearchCrseCtgryList.do?divCd=CRSE&ctgryNo='+val+'&ctgryDepth=2',selectvalue);
        }
    };

    $.fn.searchSelect = function (url, value) {
        var self = this;
        $.getAjax({
            commandUrl  : url,
            onSuccess   : function (result) {
                if (result.length < 1) {
                    $(self)[0].options.length = 0;                          
                }
                var prompt = false;
                var allPrompt = false;
                if ($(self).find("option:eq(0)").val() == "ALL") {
                    allPrompt = true;
                }
                else if ($(self).find("option:eq(0)").val() == "") {
                    prompt = true;
                }
                else {
                    $(self)[0].options.length = 0;                          
                }
                $(self).selectBoxOptionChange({
                    data     : result, 
                    name     : 'name', 
                    value    : 'value',
                    prompt   : prompt,
                    allPrompt: allPrompt,
                    selected : value
                });
            }
        });
    };
    
	/*
	 * $('#compCd').searchComp('회사코드');
	 */
	$.fn.searchComp = function (value) {
		var self = this;
		$.getAjax({
			commandUrl  : BASE_ROOT + '/common/search/SearchCompList.do',
			onSuccess    : function (result) {
				var prompt = false;
				var allPrompt = false;
				if ($(self).find("option:eq(0)").val() == "ALL") {
					allPrompt = true				
				}
				else if ($(self).find("option:eq(0)").val() == "") {
					prompt = true				
				}
				else {
					$(self)[0].options.length = 0;            				
				}
				
				$(self).selectBoxOptionChange({
					data     : result.data, 
					name     : 'name', 
					value    : 'value',
					prompt	 : prompt,
					allPrompt: allPrompt,
					selected : value
				});
				
				$(self).trigger('change');
			}
		});
	};


	/*
	 * $('#deptCd').searchPosition('회사코드', '부서 코드');
	 */
	$.fn.searchDept = function (field, value) {
		$(this).searchChained(field, BASE_ROOT + '/common/search/SearchDeptList.do', value);
	};

	/*
	 * $('#positionCd').searchPosition('회사코드', '직급 코드');
	 */
	$.fn.searchPosition = function (field, value) {
		$(this).searchChained(field, BASE_ROOT + '/common/search/SearchPositionList.do', value);
	};
	
	
	/*
	 * $('#sgrYy').searchSgrYy('#sgrCd', '2015');
	 */
	$.fn.searchSgrYy = function (field, value) {
    	$(this).searchChained(field, BASE_ROOT + '/common/search/SearchSgrYyList.do', value);
	};

	/*
	 * $('#sgrSessionCd').searchSgrSession('#sgrCd, #sgrYy', '1405-001');
	 */
	$.fn.searchSgrSession = function (field, value) {
    	$(this).searchChained(field, BASE_ROOT + '/common/search/SearchSgrSessionList.do', value);
	};

	/*
	 * $('#subjCd').searchSubj('#sgrCd', 'A001');
	 */
	$.fn.searchSubj = function (field, value) {
    	$(this).searchChained(field, BASE_ROOT + '/common/search/SearchSubjList.do', value);
	};

	/*
	 * $('#seqCd').searchSubjSeq('#sgrCd, #sgrYy', 'A001');
	 */
	$.fn.searchSubjSeq = function (field, value) {
    	$(this).searchChained(field, BASE_ROOT + '/common/search/SearchSubjSeqList.do', value);
	};
	
	/*
	 * $('#subjCd').searchSubjCategory('#sgrCd, #subjCd', '1002');
	 */
	$.fn.searchSubjCategory = function (field, value) {
		var self = this;
		var id = this.attr('id');
		var fid = '';

		console.log(value);
		if (field == undefined) field = '';
		if (value != undefined && value.indexOf('/') == -1 && value != '' ) {
			var data = $.getAjaxAsync({
				commandUrl  : BASE_ROOT + '/common/search/SearchSubjCategoryPath.do',
				commandData : 'categoryCd='+ value
			});
			value = data.categoryPath
		}
		var val = value.split('/');

		for (var i = 1; i < 4; i++) {
			fid = id +''+ i;
			
			$('#'+ fid).remove();
			$(self).before('<select id="'+ fid +'" name="'+ fid +'"><option value="">과정분류 '+ i +'</select>&nbsp;');
			
			if (i != 1) { 
				field += ', #'+ id + (i - 1);
			}
			
	    	$('#'+ fid).searchChained(field, BASE_ROOT + '/common/search/SearchSubjCategoryList.do', val[i]);
	    	
			$('#'+ fid).bind('change',  function () {
				if (this.value != '') { 
					$(self).val(this.value);
				}
			});	    	
			$('#'+ fid).bind('complete',  function () {
				if (this.value != '') { 
					$(self).val(this.value);
				}
			});
		}
	};
 
})(jQuery);
 