$(function () {
  var layer = layui.layer
  var form = layui.form

  initArtCateList()

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 为添加类别按钮绑定点击事件
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()

    })
  })

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    let dataStr = $(this).serialize()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: dataStr,
      success(res) {
        if (res.status !== 0) return
        //如果成功
        //更新 分类列表
        initArtCateList()
        //关闭 弹出层
        layui.layer.close(indexAdd)
      }
    })
  })


  $('tbody').on('click', '.btn-delete', function () {
    let delId = this.parentNode.dataset.id//取出 data-id属性值
    console.log(delId);
    //发送请求 
    $.ajax({
      methodL: 'GET',
      url: '/my/articale/deletecate/' + delId,
      success(res) {
        layui.layer.msg(res.message)
        if (res.status !== 0) return
        //如果成功 重新请求 分类列表
        initArtCateList()
      }
    })
  })
})
