 // 引导步骤配置
 const guideSteps = [
    {  
        title: '顶部导航栏1ST',
        text: '这是关于按钮，点击可查看关于作者的话' 
    },
    {
        title: '顶部导航栏2ND',
        text: '任何时候点击它都可以重新查看本引导教程，从文件夹点击任意页面进入都会默认显示教程' 
    },
    {
        title: '顶部导航栏3RD',
        text: '可以播放音乐，但暂不支持跳转不中断播放'
    },
    {
        title: '搜索框',
        text: '搜索框位于顶部导航栏右侧，但该功能暂未实现'
    },
    {
        title: '登入注册',
        text: '登入注册功能位于顶部导航栏右侧，暂可直接进入'
    },
    {
        title: '垂直导航栏1ST',
        text: '为网页首页面同时也是四大名著首页面，读者可通过该页面跳转阅览深层页面内容'
    },
    {
        title: '垂直导航栏2ND',
        text: '仅展示与四大名著的作者趣味对话，不支持对话功能'
    },
    {
        title: '垂直导航栏3RD',
        text: '关于四大名著的简单相关信息'
    } 
];
        let currentStep = 0;
        let isGuideActive = false;
        
        // 初始化引导系统
        function initGuideSystem() {
            // 教程按钮事件
            document.getElementById('tutorialBtn').addEventListener('click', startGuide);
            
            // 导航按钮事件
            document.getElementById('nextGuideStep').addEventListener('click', nextStep);
            document.getElementById('prevGuideStep').addEventListener('click', prevStep);
            document.getElementById('closeGuide').addEventListener('click', closeGuide);
        }
           // 首次访问时自动启动引导
           if (!sessionStorage.getItem('guideShown')) {
                setTimeout(startGuide, 1000);
                sessionStorage.setItem('guideShown', 'true');
            }
        // 启动引导
        function startGuide() {
            isGuideActive = true;
            currentStep = 0;
            document.getElementById('guideOverlay').classList.add('active');
            showStep(currentStep);
        }
        
        // 关闭引导
        function closeGuide() {
            isGuideActive = false;
            document.getElementById('guideOverlay').classList.remove('active');
      
        }
         // 显示当前步骤
         function showStep(step) {
            const stepConfig = guideSteps[step];
            
            // 更新文本
            document.getElementById('guideTitle').textContent = stepConfig.title;
            document.getElementById('guideText').textContent = stepConfig.text;
            document.getElementById('guideProgress').textContent = `${step + 1}/${guideSteps.length}`;
            
            // 更新按钮状态
            document.getElementById('prevGuideStep').disabled = step === 0;
            document.getElementById('nextGuideStep').textContent = 
                step === guideSteps.length - 1 ? '完成' : '下一步';
        }
        
        // 下一步
        function nextStep() {
            if (currentStep < guideSteps.length - 1) {
                currentStep++;
                showStep(currentStep);
            } else {
                closeGuide();
            }
        }
        
        // 上一步
        function prevStep() {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        }
        
        // 初始化引导系统
        document.addEventListener('DOMContentLoaded', initGuideSystem);
  