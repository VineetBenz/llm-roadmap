const ROADMAP_DATA = {
  "roadmap": [
    {
      "Stage": "Stage 1 - Math Foundations",
      "Topic": "Linear Algebra",
      "Deliverable": "Essence of Linear Algebra",
      "Resource": "3Blue1Brown",
      "Link": "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
      "Goal": "Understand Vector Spaces, Matrices, and Eigenspaces.",
      "Implementation": "https://github.com/fastai/fastbook/blob/master/01_intro.ipynb"
    },
    {
      "Stage": "Stage 1 - Math Foundations",
      "Topic": "Multivariable Calculus",
      "Deliverable": "Gradients & Partial Derivatives",
      "Resource": "Khan Academy / 3B1B",
      "Link": "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
      "Goal": "Master the Chain Rule for Backpropagation.",
      "Implementation": "https://colab.research.google.com/drive/1T_4Xg6vV5Ff8f6z5_f0_5"
    },
    {
      "Stage": "Stage 2 - NN Foundations",
      "Topic": "Neural Networks from Scratch",
      "Deliverable": "The Spellbook (Micrograd)",
      "Resource": "Andrej Karpathy",
      "Link": "https://www.youtube.com/watch?v=VMj-3S1tku0",
      "Goal": "Build a library that can compute gradients automatically.",
      "Implementation": "https://github.com/karpathy/micrograd"
    },
    {
      "Stage": "Stage 2 - NN Foundations",
      "Topic": "Backprop & Optimization",
      "Deliverable": "Adam & SGD Intuition",
      "Resource": "Andrej Karpathy",
      "Link": "https://www.youtube.com/watch?v=PaCmpygFfXo",
      "Goal": "Understand weight initialization and Batch Norm.",
      "Implementation": "https://github.com/karpathy/nn-zero-to-hero"
    },
    {
      "Stage": "Stage 3 - Transformers Architecture",
      "Topic": "Self-Attention Mechanism",
      "Deliverable": "Attention is All You Need",
      "Resource": "Yannic Kilcher",
      "Link": "https://www.youtube.com/watch?v=iDulhoQ2pro",
      "Goal": "Derive Q, K, V matrices and Scaled Dot-Product Attention.",
      "Implementation": "https://github.com/jadore801120/attention-is-all-you-need-pytorch"
    },
    {
      "Stage": "Stage 4 - Building GPT",
      "Topic": "Let's build GPT",
      "Deliverable": "makemore / nanogpt",
      "Resource": "Andrej Karpathy",
      "Link": "https://www.youtube.com/watch?v=kCc8FmEb1nY",
      "Goal": "Train a character-level transformer from scratch.",
      "Implementation": "https://github.com/karpathy/nanoGPT"
    },
    {
      "Stage": "Stage 5 - RLHF & Fine-tuning",
      "Topic": "Instruction Tuning",
      "Deliverable": "DPO / PPO Methods",
      "Resource": "DeepLearning.AI",
      "Link": "https://www.youtube.com/watch?v=2-WpUX6_Osw",
      "Goal": "Align LLMs with human preferences.",
      "Implementation": "https://github.com/huggingface/trl"
    },
    {
      "Stage": "Stage 6 - Scaling & Systems",
      "Topic": "DeepSpeed & FSDP",
      "Deliverable": "Distributed Training",
      "Resource": "Microsoft Research",
      "Link": "https://www.youtube.com/watch?v=T_pGSuA_L_A",
      "Goal": "Learn how to train 70B+ models on multi-GPU clusters.",
      "Implementation": "https://github.com/microsoft/DeepSpeed"
    }
  ],
  "papers": [
    {
      "Category": "Architecture",
      "Title": "Attention is All You Need",
      "Author": "Vaswani et al.",
      "Year": "2017",
      "Link": "https://arxiv.org/abs/1706.03762",
      "Goal": "Birth of the Transformer."
    },
    {
      "Category": "Scale",
      "Title": "Language Models are Few-Shot Learners",
      "Author": "Brown et al. (OpenAI)",
      "Year": "2020",
      "Link": "https://arxiv.org/abs/2005.14165",
      "Goal": "The GPT-3 Paper."
    },
    {
      "Category": "Efficiency",
      "Title": "LoRA: Low-Rank Adaptation of LLMs",
      "Author": "Hu et al. (Microsoft)",
      "Year": "2021",
      "Link": "https://arxiv.org/abs/2106.09685",
      "Goal": "Modern Fine-tuning standard."
    },
    {
      "Category": "Alignment",
      "Title": "Training LMs to follow instructions",
      "Author": "Ouyang et al. (OpenAI)",
      "Year": "2022",
      "Link": "https://arxiv.org/abs/2203.02155",
      "Goal": "InstructGPT / RLHF foundations."
    },
    {
      "Category": "Efficiency",
      "Title": "FlashAttention",
      "Author": "Dao et al.",
      "Year": "2022",
      "Link": "https://arxiv.org/abs/2205.14135",
      "Goal": "Speeding up attention by O(N)."
    },
    {
      "Category": "Efficiency",
      "Title": "LLaMA: Open & Efficient Foundation Models",
      "Author": "Touvron et al. (Meta)",
      "Year": "2023",
      "Link": "https://arxiv.org/abs/2302.13971",
      "Goal": "The open-source revolution."
    }
  ],
  "planner": [
    {
      "Week": "Week 1-2",
      "Topic": "Mathematical Foundations",
      "Focus": "Linear Algebra, Calculus, and Probability",
      "Deliverable": "Solved Grad-Checks for Multilayer Perceptron.",
      "Action": "https://www.deeplearningbook.org/contents/linear_algebra.html"
    },
    {
      "Week": "Week 3-4",
      "Topic": "Deep Learning Core",
      "Focus": "Activation functions, Optimizers, Normalization",
      "Deliverable": "Built Micrograd from Scratch.",
      "Action": "https://github.com/karpathy/micrograd"
    },
    {
      "Week": "Week 5-8",
      "Topic": "The Transformer Era",
      "Focus": "Self-Attention, Positional Encoding, Cross-Attention",
      "Deliverable": "Implementation of Attention is All You Need.",
      "Action": "https://karpathy.ai/zero-to-hero.html"
    }
  ],
  "costs": [
    {
      "Model": "7B Llama",
      "Compute": "A100 (80GB) x 8",
      "Time": "24 Hours",
      "Cost": "~$300 (Cloud)",
      "Tip": "Use LoRA to reduce cost by 90%."
    },
    {
      "Model": "70B Llama",
      "Compute": "H100 x 32",
      "Time": "1 Week",
      "Cost": "~$25,000+",
      "Tip": "Use FSDP + DeepSpeed."
    }
  ],
  "gpt_scratch": [
    {
      "Step": "1. Tokenization",
      "Action": "Implement Byte-Pair Encoding (BPE)",
      "Resource": "Tiktoken",
      "Link": "https://github.com/openai/tiktoken"
    },
    {
      "Step": "2. Embedding",
      "Action": "Token & Positional Embeddings",
      "Resource": "Sinusoidal vs Learned",
      "Link": "https://pytorch.org/docs/stable/generated/torch.nn.Embedding.html"
    },
    {
      "Step": "3. Block",
      "Action": "Multi-Head Attention + FeedForward",
      "Resource": "LayerNorm placement (Pre-norm)",
      "Link": "https://arxiv.org/abs/2002.04745"
    }
  ],
  "math": [
    {
      "Concept": "Chain Rule",
      "Application": "Backpropagation",
      "Verify": "Calculate dL/dx for x*y+z manually."
    },
    {
      "Concept": "Softmax",
      "Application": "Probability Distribution",
      "Verify": "Prove that Softmax is translation invariant."
    },
    {
      "Concept": "Cross Entropy",
      "Application": "Loss Function",
      "Verify": "Derive Gradient of Cross Entropy + Softmax."
    }
  ]
};